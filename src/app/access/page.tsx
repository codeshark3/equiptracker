import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { getAllAccessRequests } from '~/server/access_request_queries'

const page = async () => {
    const accessRequests = await getAllAccessRequests();
    if ('error' in accessRequests) {
        return <div>Error loading access requests</div>;
    }
    return (
        <DataTable columns={columns} data={accessRequests as any} />
    )
}

export default page