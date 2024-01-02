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
import { addProduct, deleteImage, editProduct, getParticularProduct } from '../../../src/services/apis';
import Image from 'next/image';

interface Location {
    location_id: string;
    price: number;
    quantity: number;
}

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
    const [showImage, setShowImage] = useState<any>();
    const [allValue, setAllValue] = useState<FormValues>({
        productName: '',
        productType: '',
        locations: [{ location_id: '', price: null, quantity: null }],
        document: null,
        images: []
    });

    const [error, setError] = useState<any>([]);


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
    const handle = {
        onChangeField: (value: any, name: string) => {
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
        locationDelete: (indexToDelete: number) => {
            setAllValue((prevValues) => ({
                ...prevValues,
                locations: prevValues.locations.filter((_, index) => index !== indexToDelete),
            }));
        },
        locationChange: (index: number, field: string, value: string | number) => {
            setAllValue((prevValues) => ({
                ...prevValues,
                locations: prevValues.locations.map((location, i) =>
                    i === index ? { ...location, [field]: value } : location
                ),
            }));
        },
        imageChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file: any = event.target.files?.[0];
            setShowImage(URL.createObjectURL(file))
            setAllValue((prevValues) => ({
                ...prevValues,
                document: file || null,
            }));
        },
        deleteImages: async (e, id) => {
            e.preventDefault();
            if (params?.slug) {
                let response = await deleteImage(Number(id))
                if (response) {
                    allValue?.images?.filter((item: any) => item.product_image_id !== id)
                    setAllValue(() => ({
                        ...allValue,
                        images: allValue?.images?.filter((item: any) => item.product_image_id !== id),
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

                if (allValue.document) {
                    formData.append('documents', allValue.document);
                }
                formData.append('created_at', currentDate.toString());
                formData.append('updated_at', currentDate.toString());
                let response: object | any;

                console.log('allValue.product_location_id,', allValue.product_location_id);
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
                                        onClick={() => handle.locationDelete(index)}
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
                                            <option value={1}>Bensalem</option>
                                            <option value={2}>Ivyland</option>
                                            <option value={3}>Crydon</option>
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
                        multiple
                        onChange={(e: any) => handle.imageChange(e)}
                        className={'centered-input mt-2'}
                    />

                    {showImage &&
                        <div className="signature-block" onClick={() => window.open(showImage, "_blank")} >
                            <Image src={showImage} alt="docs"
                                width={215}
                                height={55}
                                className="mx-auto"
                            />
                        </div>
                    }



                    {!showImage ? allValue?.images &&
                        allValue?.images?.map((item: any) => (
                            <div>
                                <Image src={`http://localhost:5000/public/document/${item?.image}`} alt="docs"
                                    width={215}
                                    height={55}
                                    className="mx-auto"
                                    onClick={() => window.open(`http://localhost:5000/public/document/${item?.image}`, "_blank")}
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
            </main>
            <Footer />
        </div >
    );
};

export default AddProduct;

