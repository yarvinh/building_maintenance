const workOrderSelector = (workOrders,filterBy)=>{
    const today = new Date()
        if (filterBy === "expire"){
        return workOrders.filter((workOrder)=>{
            return new Date(workOrder.date) < today
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