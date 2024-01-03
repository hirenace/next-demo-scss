import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import CenteredButton from '../../src/components/hoc/button';
import Footer from '../../src/components/layout/footer';
import Header from '../../src/components/layout/header';
import Modal from '../../src/components/hoc/modal';
import { deleteProduct, fetchProductData, getLocation } from '../../src/services/apis';
import globalMessages from '../../src/utils/globalization';

// Define types for your data structure
interface ProductLocation {
    product_location_id: number;
    product_id: number;
    location_id: number;
    price: string;
    quantity: number;
}

interface ProductImage {
    product_image_id: number;
    product_id: number;
    image: string;
}

interface Product {
    product_id: number;
    name: string;
    type: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    locations: ProductLocation[];
    images: ProductImage[];
    id: number;
}

const Product = () => {
    const router = useRouter()
    const [isModalOpen, setModalOpen] = useState(false);
    const [productList, setProductList] = useState<Product[] | any>([]);
    const [isDeletedIds, setIsDeletedIds] = useState<number | null>(null);
    const [locationList, setLocation] = useState<any>([]);

    const { modal_text, modal_title } = globalMessages;

    useEffect(() => {
        fetchProduct();
        getAllLocation();
    }, [])

    const getAllLocation = async () => {
        let response = await getLocation();
        if (response) {
            setLocation(response)
        }
    }

    const fetchProduct = async () => {
        const getProduct: any = await fetchProductData()
        const newArray = getProduct?.map((obj) => ({ ...obj, id: obj?.product_id })); // added the id key because MUI table must be needed id fields
        setProductList(newArray)
    }

    const columns: GridColDef[] = [
        {
            field: 'product_id', headerName: '#', width: 50, sortable: false,
            renderCell: (params) => {
                const rowIndex = productList.indexOf(params.row) + 1;
                return <>{rowIndex}</>;
            },
        },
        {
            field: 'images', headerName: 'Image', width: 90, sortable: false,
            renderCell: (params) => (
                <div className="signature-block">{
                    params?.value[0]?.image ?
                        <Image src={process.env.NEXT_PUBLIC_IMAGE + params?.value[0]?.image} alt="docs"
                            onClick={() => window.open(process.env.NEXT_PUBLIC_IMAGE + params?.value[0]?.image, "_blank")}
                            width={80}
                            height={80}
                            className="mx-auto"
                        /> : '-'}
                </div>
            )
        },
        { field: 'name', headerName: 'Name', width: 200, sortable: false },
        { field: 'type', headerName: ' Product Type', width: 150, sortable: false },
        {
            field: 'locations',
            headerName: 'Locations',
            sortable: false,
            width: 300,
            renderCell: (params) => (
                <div>
                    {
                        params.value.map((location) => {
                            const matchingLocation = locationList.find(
                                (item) => item.location_id === location.location_id
                            );

                            return (
                                <div key={location.locationId}>
                                    {matchingLocation ? matchingLocation.name : 'Unknown Location'} - Price: ${location.price}, Quantity: {location.quantity}
                                </div>
                            );
                        })
                    }
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div className='d-flex'>
                    <CenteredButton className={'edit-button'} onClick={() => handle.edit(params.row)} type={"button"} buttonText={"Edit"} />
                    <CenteredButton className={'delete-button'} onClick={() => handle.delete(params.row)} type={"button"} buttonText={"Delete"} />
                </div>
            ),
        },
    ];

    const handle = {
        submit: async () => {
            const deletedProduct: any = await deleteProduct(Number(isDeletedIds))
            if (deletedProduct) {
                toast.success(deletedProduct?.message);
                setProductList(productList?.filter(item => item.id !== isDeletedIds))
                handle.closeModal(); // You can close the modal after submitting
            }
        },
        edit: (row) => {
            router.push(`/product/form/${row?.id}`)
        },
        delete: (row) => {
            // Handle delete action
            setIsDeletedIds(row?.id)
            handle.openModal()
        },
        closeModal: () => {
            setModalOpen(false);
        },
        openModal: () => {
            setModalOpen(true);
        },
    }

    return (
        <div className={'home-container'}>
            <Header />
            <main className={"main"}>
                <div className='content-wrapper d-flex'>
                    <p className='mr-2'>Product</p>
                    <CenteredButton type={"button"} className={'add-button'} buttonText={"Add"} onClick={() => router.push('/product/form')} />
                    <p className='margin-auto'><Link href={'/'}>Go back</Link></p>
                </div>
                <DataGrid
                    rows={productList || 0}
                    columns={columns}
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector />
            </main>
            <Footer />
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={handle.closeModal} header={<h2>{modal_title}</h2>} onSubmit={handle.submit}>
                    <p>{modal_text}</p>
                </Modal>
            }
        </div >
    )
}

export default Product