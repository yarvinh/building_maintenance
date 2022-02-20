export const workOrderSelector = (workOrders,filterBy)=>{
    // console.log(workOrders,filterBy)
    const today = new Date()
        if (filterBy === "expire" ){
        return workOrders.filter((workOrder)=>{
            return new Date(workOrder.date) < today && !workOrder.status 
        })

        } else if (filterBy === 'pending'){
        return  workOrders.filter((workOrder)=>{
        
            return !workOrder.status && (new Date(workOrder.date) > today)
          })

        } else if (filterBy === 'closed'){
            return  workOrders.filter((workOrder)=>{
                return workOrder.status
          
            })

        } else {
            return workOrders
        }
}

export const workOrderDetailsSelector = (workOrders, id) =>{
    if(id){
        return workOrders.find((workOrder)=>{
            return workOrder.id.toString() === id   
        })
    }
}
