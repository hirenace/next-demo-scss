import React from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CenteredButton from '../../src/components/hoc/button';
import Link from 'next/link';
import Footer from '../../src/components/layout/footer';
import Header from '../../src/components/layout/header';
import { useState } from 'react';
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
                    <button className={'edit-button'} onClick={() => handleEdit(params.row)}>Edit</button>
                    <button className={'delete-button'} onClick={() => handleDelete(params.row)}>Delete</button>
                </div>
            ),
        },
    ];

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleEdit = (row) => {
        // Handle edit action
        console.log('Edit:', row);
        router.push(`/product/form/${row?.id}`)
    };

    const handleDelete = (row) => {
        // Handle delete action
        openModal()
        console.log('Delete:', row);
    };

    function handleAdd(): void {
        console.log('Add:');
        router.push('/product/form')
    }

    const handleSubmit = () => {
        // Handle the submit action here
        console.log('Submit clicked!');
        closeModal(); // You can close the modal after submitting if needed
    };

    return (
        <div className={'home-container'}>
            <Header />
            <main className={"main"}>
                <div className='content-wrapper d-flex'>
                    <p className='mr-2'>Product</p>
                    <CenteredButton type={"button"} className={'add-button'} buttonText={"Add"} onClick={() => handleAdd()} />
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
                <Modal isOpen={isModalOpen} onClose={closeModal} header={<h2>Confirm!</h2>} onSubmit={handleSubmit}>
                    <p>Are you sure? You want to delete this record</p>
                </Modal>
            }
        </div >
    )
}

export default Product