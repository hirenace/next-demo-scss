// AddProduct.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Footer from '../../../src/components/layout/footer';
import Header from '../../../src/components/layout/header';
import CenteredInput from '../../../src/components/hoc/input';
import CenteredButton from '../../../src/components/hoc/button';
import globalMessages from '../../../src/utils/globalization';
import productSchema from '../../../src/utils/validationSchema/productSchema';
import {
    addProduct,
    deleteImage,
    deleteLocation,
    editProduct,
    getLocation,
    getParticularProduct,
} from '../../../src/services/apis';
import Image from 'next/image';
import Modal from '../../../src/components/hoc/modal';

interface FormValues {
    productName: string;
    productType: string;
    locations: any;
    document: any | null;
    product_location_id?: number
    images?: any
}

const AddProduct: React.FC = () => {
    const router = useRouter();

    const params = useParams()
    const { title, name_placeholder, product_type, locations_place, location_price, location_quantity, add_location_btn, delete_location_btn, submit_button_text } = globalMessages?.product_form;
    const { modal_text, modal_title } = globalMessages;
    const [showImage, setShowImage] = useState<any>();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeletedIds, setIsDeletedIds] = useState<number | null>(null);

    const [allValue, setAllValue] = useState<FormValues>({
        productName: '',
        productType: '',
        locations: [{ location_id: '', price: null, quantity: null }],
        document: null,
        images: []
    });

    const [locationList, setLocation] = useState<any>([]);
    const [error, setError] = useState<any>([]);

    useEffect(() => {
        getAllLocation();
    }, [])

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        let product: object | any = await getParticularProduct(Number(params?.slug))

        if (product) {
            setAllValue({
                ...allValue,
                productName: product?.name,
                productType: product?.type,
                locations: product?.locations,
                images: product?.images,
            })
        }
    }

    const getAllLocation = async () => {
        let response = await getLocation();
        if (response) {
            setLocation(response)
        }
    }

    const handle = {
        onChangeField: (value: string | number, name: string) => {
            setAllValue((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        },
        locationAdd: () => {
            setAllValue((prevValues) => ({
                ...prevValues,
                locations: [...prevValues.locations, { location_id: '', price: null, quantity: null }],
            }));
        },
        locationDelete: (product_location_id: number, indexToDelete: number) => {
            if (product_location_id) {
                setIsDeletedIds(product_location_id)
                handle.openModal()
            } else {
                setAllValue((prevValues) => ({
                    ...prevValues,
                    locations: prevValues.locations.filter((_, index) => index !== indexToDelete),
                }));
            }
        },
        deleteLocation: async () => {
            if (isDeletedIds) {
                const deletedLocation: any = await deleteLocation(Number(isDeletedIds))

                if (deletedLocation) {
                    toast.success(deletedLocation?.message);
                    getProduct();
                    handle.closeModal(); // You can close the modal after submitting if needed
                }
            }
        },
        locationChange: (index: number, field: string, value: string | number) => {
            setAllValue((prevValues) => ({
                ...prevValues,
                locations: prevValues.locations.map((location, i) =>
                    i === index ? { ...location, [field]: value } : location
                ),
            }));
        },
        closeModal: () => {
            setModalOpen(false);
        },
        openModal: () => {
            setModalOpen(true);
        },
        imageChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
            const files: FileList | null = event.target.files;

            if (files) {
                const fileList: File[] = Array.from(files);

                // Display previews for all selected files
                const imagePreviews = fileList.map((file, index) => ({
                    id: index,
                    url: URL.createObjectURL(file),
                }));
                setShowImage(imagePreviews);

                setAllValue((prevValues) => ({
                    ...prevValues,
                    document: fileList || [],
                }));
            }
        },
        deleteImages: async (event: React.ChangeEvent<HTMLInputElement>, id) => {
            event.preventDefault();
            if (params?.slug) {
                let response = await deleteImage(Number(id))
                if (response) {
                    allValue?.images?.filter((item: { product_image_id: number; }) => item.product_image_id !== id)
                    toast.success('Image deleted successfully.')
                    setAllValue(() => ({
                        ...allValue,
                        images: allValue?.images?.filter((item: { product_image_id: number; }) => item.product_image_id !== id),
                    }));
                }
            }
        },
        submit: async () => {
            try {
                await productSchema.validate(allValue, { abortEarly: false });
                const formData = new FormData();
                let currentDate = new Date();

                formData.append('name', allValue.productName);
                formData.append('type', allValue.productType);

                if (allValue.document && allValue.document.length > 0) {
                    allValue.document.map((file) => {
                        formData.append(`documents`, file)
                    });
                }
                formData.append('created_at', currentDate.toString());
                formData.append('updated_at', currentDate.toString());
                let response: object | any;

                let ids: any = Number(params.slug)
                if (ids) {
                    const locationsWithId = allValue?.locations.map((location) => ({
                        ...location,
                        product_location_id: location.product_location_id,
                    }));
                    formData.append('product_id', ids);

                    formData.append('locations', JSON.stringify(locationsWithId));
                    response = await editProduct(ids, formData);
                    if (response) toast.success(response?.message)
                } else {
                    formData.append('locations', JSON.stringify(allValue?.locations));
                    response = await addProduct(formData);
                    if (response) toast.success(response?.message)
                }
                if (response) router.push('/product')
                setError({});
            } catch (error) {
                // Handle validation errors
                // Set validation errors in state
                const errors = error?.inner?.reduce((acc, err) => {
                    acc[err.path] = err.message;
                    return acc;
                }, {});
                setError(errors);
            }
        },
    };

    return (
        <div className="home-container">
            <Header />
            <main className="main">
                <h1 className="text-center">{title} </h1>
                <form className="add-product-form">
                    <CenteredInput
                        type="text"
                        placeholder={name_placeholder}
                        name={'productName'}
                        value={allValue?.productName}
                        onChange={(e) => handle.onChangeField(e.target.value, 'productName')}
                        className={'centered-input mt-2'}
                    />

                    {error && (
                        <p role="alert" className={'error-message'}>
                            {error[0]}
                        </p>
                    )}

                    <label>
                        <select value={allValue?.productType} className="dropdown-select" onChange={(e) => handle.onChangeField(e.target.value, 'productType')}>
                            <option value="0" >Select {product_type}</option>
                            <option value="unit">Unit</option>
                            <option value="type">Type</option>
                        </select>
                    </label>

                    <div className="locations">
                        {allValue.locations.map((location, index) => (
                            <div key={index} className="location">
                                {index === 0 ? (
                                    <CenteredButton
                                        onClick={() => handle.locationAdd()}
                                        className={'centered-button mt-2 mb-2'}
                                        type={"button"}
                                        buttonText={add_location_btn}
                                    />
                                ) : (
                                    <CenteredButton
                                        onClick={() => handle.locationDelete(location?.product_location_id, index)}
                                        className={'centered-button mt-2 mb-2'}
                                        type={"button"}
                                        buttonText={delete_location_btn}
                                    />
                                )}
                                <label>
                                    <span>{locations_place} {index + 1}</span>
                                    <div className="dropdown">
                                        <select
                                            value={location.location_id}
                                            onChange={(e) => handle.locationChange(index, 'location_id', e.target.value)}
                                            className="dropdown-select"
                                        >
                                            <option value={0}>Select {locations_place}</option>
                                            {locationList?.map((location, index) => (
                                                <option key={index} value={location?.location_id}>{location?.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </label>

                                <CenteredInput
                                    type="text"
                                    placeholder={location_price}
                                    name={'price'}
                                    value={location.price}
                                    onChange={(e) => handle.locationChange(index, 'price', Number(e.target.value))}
                                    className={'centered-input mt-2'}
                                />

                                <CenteredInput
                                    type="text"
                                    placeholder={location_quantity}
                                    name={'quantity'}
                                    value={location.quantity}
                                    onChange={(e) => handle.locationChange(index, 'quantity', Number(e.target.value))}
                                    className={'centered-input mt-2'}
                                />
                            </div>
                        ))}
                    </div>

                    <CenteredInput
                        type="file"
                        placeholder={"Image:"}
                        name={'document'}
                        accept="image/*"
                        onChange={(e) => handle.imageChange(e)}
                        className={'centered-input mt-2'}
                        multiple
                    />

                    {showImage &&
                        showImage?.map((item: any) => (
                            <div className="signature-block" onClick={() => window.open(item?.url, "_blank")} >
                                <Image src={item?.url} alt="docs"
                                    width={215}
                                    height={55}
                                    className="mx-auto"
                                />
                            </div>
                        ))
                    }

                    {allValue?.images ?
                        allValue?.images?.map((item: { image: string; product_image_id: any; }) => (
                            <div>
                                <Image src={process.env.NEXT_PUBLIC_IMAGE + item?.image} alt="docs"
                                    width={215}
                                    height={55}
                                    className="mx-auto"
                                    onClick={() => window.open(`${process.env.NEXT_PUBLIC_IMAGE + item?.image}`, "_blank")}
                                />
                                {params?.slug &&
                                    <button className="close-icon" onClick={(e: any) => handle.deleteImages(e, item?.product_image_id)}>
                                        x
                                    </button>}
                            </div>
                        ))
                        : ""}


                    {Object?.keys(error).length > 0 && (
                        <div className="validation-error">
                            {Object.entries(error).map(([field, error]) => (
                                <p role="alert" className={'error-message'}>
                                    {` ${error}`}
                                </p>
                            ))}
                        </div>
                    )}
                    <CenteredButton
                        className={'centered-button'}
                        type={"button"}
                        onClick={() => handle.submit()}
                        buttonText={submit_button_text}
                    />
                </form>

                {isModalOpen &&
                    <Modal isOpen={isModalOpen} onClose={handle.closeModal} header={<h2>{modal_title}</h2>} onSubmit={handle.deleteLocation}>
                        <p>{modal_text}</p>
                    </Modal>
                }
            </main>
            <Footer />
        </div >
    );
};

export default AddProduct;

