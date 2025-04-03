import  { useCallback, useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import databaseService from '../../services/database.services'
import useCustomReactQuery from '../../utils/useCustomReactQuery'
import { EventForm, QueryHandler } from '../../components'
function EditEvent() {
    const {eventId}=useParams()
    const [event,setEvent]=useState(null)

    const navigate=useNavigate()
    const fetchEvent=useCallback(
        ()=>databaseService.getEventById({eventId}),
        [eventId]
    )
    const {data,loading,error}=useCustomReactQuery(fetchEvent)

    useEffect(()=>{
        if(!eventId){
            navigate('/')
            return
        }
        if(data){
            setEvent(data)
        }
    },[eventId,data,navigate])


  return (
   <QueryHandler queries={[{ loading, error }]}>
        {
            event ? (
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Edit Event
                  </h2>
                  <EventForm event={event} />
                </div>
            ) : null
        }
    </QueryHandler>
  )
}

export default EditEvent