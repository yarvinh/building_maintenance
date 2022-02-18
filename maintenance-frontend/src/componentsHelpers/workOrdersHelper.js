export const workOrderStatus = (workOrder) => {
    const today = new Date()
    if (new Date(workOrder.date) < today && !workOrder.status){
       return <p style={{color: "red"}}>Expired</p>

    } else if (!workOrder.status){
       return <p style={{color: "orange"}}>Pending</p>

    } else if (workOrder.status){
        return <p style={{color: "green"}}>Closed</p>
    }
  }


