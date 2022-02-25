export const workOrderSelector = (workOrders,filterBy)=>{
    const today = new Date()
        if (filterBy === "expire" ){
        return workOrders.filter((workOrder)=>{
            return new Date(workOrder.date) < today && !workOrder.status && new Date(workOrder.date).toDateString() !== today.toDateString()
        })

        } else if (filterBy === 'pending'){
          return  workOrders.filter((workOrder)=>{
            return (!workOrder.status && new Date(workOrder.date) > today) || (!workOrder.status &&  new Date(workOrder.date).toDateString() === today.toDateString())
          })

        } else if (filterBy === 'closed'){
            return  workOrders.filter((workOrder)=>{
                return workOrder.status
          
            })

        } else if(filterBy === "today"){
            return workOrders.filter(workOrder => new Date(workOrder.date).toDateString() === today.toDateString())
        } else {
            return workOrders
        }
}

