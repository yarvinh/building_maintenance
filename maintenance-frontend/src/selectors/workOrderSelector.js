const workOrderSelector = (workOrders,filterBy)=>{
    console.log(workOrders.workOrders)
    const today= new Date().toDateString()
    console.log(filterBy)
        if (filterBy === "expire"){
        return workOrders.filter((workOrder)=>{
            return new Date(workOrder.created_at).toDateString() > today
        })

        } else if (filterBy === 'pending'){
        return  workOrders.filter((workOrder)=>{
              return !workOrder.status
          })

        } else if (filterBy === 'closed'){
            return  workOrders.filter((workOrder)=>{
                return workOrder.status
          
            })

        } else {

            return workOrders

        }
}

export default workOrderSelector