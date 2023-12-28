import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CenteredButton from '../../src/components/hoc/button';
import Link from 'next/link';
import Footer from '../../src/components/layout/footer';
import Header from '../../src/components/layout/header';

const Product = () => {
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

    const handleEdit = (row) => {
        // Handle edit action
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        // Handle delete action
        console.log('Delete:', row);
    };

    function handleAdd(): void {
        console.log('Add:');
    }

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
        </div >
    )
}

export default Product