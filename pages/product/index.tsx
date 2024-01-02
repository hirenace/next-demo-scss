import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import CenteredButton from '../../src/components/hoc/button';
import Footer from '../../src/components/layout/footer';
import Header from '../../src/components/layout/header';
import Modal from '../../src/components/hoc/modal';
import { deleteProduct, fetchProductData } from '../../src/services/apis';
import Image from 'next/image';


const locationArray = [{
    location_id: 1,
    name: 'Bensalem'
},
{
    location_id: 2,
    name: 'Ivyland'
}, {
    location_id: 3,
    name: 'Crydon'
}]

let serialNumberCounter = 0;
const Product = () => {
    const router = useRouter()
    const [isModalOpen, setModalOpen] = useState(false);
    const [productList, setProductList] = useState<any>([]);
    const [isDeletedIds, setIsDeletedIds] = useState<number | null>(null);

    useEffect(() => {
        fetchProduct()
    }, [])

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
            field: 'images', headerName: 'Image', width: 80, sortable: false,
            renderCell: (params) => (
                <div className="signature-block">{
                    params?.value[0]?.image ?
                        <Image src={`http://localhost:5000/public/document/${params?.value[0]?.image}`} alt="docs"
                            onClick={() => window.open(`http://localhost:5000/public/document/${params?.value[0]?.image}`, "_blank")}
                            width={55}
                            height={55}
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
            width: 300,
            renderCell: (params) => (
                <div>
                    {
                        params.value.map((location) => {
                            const matchingLocation = locationArray.find(
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
                <div>
                    <button className={'edit-button'} onClick={() => handle.edit(params.row)}>Edit</button>
                    <button className={'delete-button'} onClick={() => handle.delete(params.row)}>Delete</button>
                </div>
            ),
        },
    ];

    const handle = {
        submit: async () => {
            // Handle the submit action here
            const deletedProduct: any = await deleteProduct(Number(isDeletedIds))
            if (deletedProduct) {
                toast.success(deletedProduct?.message);
                setProductList(productList?.filter(item => item.id !== isDeletedIds))
                handle.closeModal(); // You can close the modal after submitting if needed
            }
        },
        edit: (row) => {
            // Handle edit action
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
                <Modal isOpen={isModalOpen} onClose={handle.closeModal} header={<h2>Confirm!</h2>} onSubmit={handle.submit}>
                    <p>Are you sure? You want to delete this record</p>
                </Modal>
            }
        </div >
    )
}

export default Product