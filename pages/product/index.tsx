import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CenteredButton from '../../src/components/hoc/button';
import Footer from '../../src/components/layout/footer';
import Header from '../../src/components/layout/header';
import Modal from '../../src/components/hoc/modal';

const Product = () => {
    const router = useRouter()
    const [isModalOpen, setModalOpen] = useState(false);

    const rows: GridRowsProp = [
        { id: 1, name: 'Apple', price: '$150', location: "Ahmadabad" },
        { id: 2, name: 'Samsung', price: '$20', location: "Surat" },
        { id: 3, name: 'MUI', price: '$30', location: "Vadodara" },
    ];

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150, sortable: false },
        { field: 'price', headerName: 'Price', width: 150, sortable: false },
        { field: 'location', headerName: 'Location', width: 150, sortable: false },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    <button className={'edit-button'} onClick={() => handle.edit(params.row)}>Edit</button>
                    <button className={'delete-button'} onClick={() => handleDelete(params.row)}>Delete</button>
                </div>
            ),
        },
    ];

    const handleDelete = (row) => {
        // Handle delete action
        console.log('Delete:', row);
        handle.openModal()
    };

    const handle = {
        submit: () => {
            // Handle the submit action here
            console.log('Submit clicked!');
            handle.closeModal(); // You can close the modal after submitting if needed
        },
        edit: (row) => {
            // Handle edit action
            router.push(`/product/form/${row?.id}`)
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
                    rows={rows}
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