const workOrderSelector = (workOrders,filterBy)=>{
    // console.log(filterBy)
    // const today= new Date().toDateString()
    // if ('Pending Work Orders'){
    //     return  workOrders.filter((workOrder)=>{
    //         const time = new Date(workOrder.created_at)
    //         let date = new Date(workOrders.created_at).toDateString()
    //         return date < today
    //     })

    //    }else if('Closed work orders'){
    //     return  workOrders.filter((workOrder)=>{
    //           let date = new Date(workOrders.created_at).toDateString()
    //           return workOrder.status
    //       })

    //     } else if ('Expired work orders'){
    //         return  workOrders.filter((workOrder)=>{
    //             let date = new Date(workOrder.created_at).toDateString()
    //             return date > today
    //         })

    //     }else{
            return workOrders
        // }
    
        
    // >Closed work orders</option>
    //                 <option value='Pending Work Orders'>Pending Work Orders</option>
    //                 <option value='Expire work orders'>Expire work orders
}

export default workOrderSelector