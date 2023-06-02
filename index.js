//you need to cilick button near edge


const API =(function(){
    const API_URI = "http://localhost:3000/events"

    //Get the data
    const getEvents = async ()=>{
        const res = await fetch(API_URI)
        return await res.json()
    } 

    //post the data
    const postEvent = async(newEvent)=>{
        const res = await fetch(API_URI,{
            method: "POST",
            headers:{
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newEvent)
        })
        return await res.json()
    }
    const deleteEvent = async(id)=>{
        const res = await fetch(`${API_URI}/${id}`,{
            method:'DELETE',
        })
        return await res.json()
    }

    const updateEvent = async(id,newEvent)=>{
        const res = await fetch(`${API_URI}/${id}`,{
            method:'PUT',
            headers:{
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newEvent)
        })
        return await res.json()
    }

    //return the methods
    return{
        getEvents,   
        postEvent,
        deleteEvent,
        updateEvent
    }
})()

//Model**********************************************************
class EventsModel{
    #events = []
    constructor(){}
    //fetch data
    async fetchEvents(){
        this.#events = await API.getEvents()
    }
    //get data
    getEvents(){
        return this.#events
    }
    //post data
    async postEvent(newEvent){
        const event = await API.postEvent(newEvent)
        this.#events.push(event)
        return event
   }
   //delete data
   async deleteEvent(id){
    const event = await API.deleteEvent(id)
    this.#events.filter(el=>el.id!==id)
    return event
    }
    async putTodo(id,newEvent){
        const todo = await API.putTodo(id,newEvent)
        return todo
   }
}

//View**********************************************************
class EventsView{
    constructor(){
        this.addEventBtn = document.getElementById("add-event-btn")
        this.eventsList = document.getElementById("event-list_body")
    }

    initRenderEvents(events){
        events.forEach(event=>{
            this.appendEvent(event)
        })
    }

    //append event
    appendEvent(event){  
        const newEvent = this.createEvent(event)
        this.eventsList.append(newEvent)
    }

    appendAddEvent(addLine){  
        this.eventsList.append(addLine)
    }


    findSave(){
        return document.getElementById("saveBtn")
    }

    findValue(){
        const title = document.getElementById(`input-title`).value
        const startDate = document.getElementById(`add-startDate`).value
        const endDate = document.getElementById(`add-endDate`).value
        console.log({title,startDate,endDate})
        return {title,startDate,endDate}
    }

    findUpdateValue(){
        const title = document.getElementById(`input-title`).value
        const startDate = document.getElementById(`add-startDate`).value
        const endDate = document.getElementById(`add-endDate`).value
        console.log({title,startDate,endDate})
        return {title,startDate,endDate}
    }
    deleteAdd(){
        const element = document.getElementById(`add-event`)
        element.remove()
    }

    deleteRenderEvent(id){
        const element = document.getElementById(`event-${id}`)
        element.remove()
    }


    updateEventHandeler(id){
        const element = document.getElementById(`event-${id}`)
        element.innerHTML= `
        <div class="event" id="event-${id}">
            <input type = "text" id="update-title-${id}"/>
            <input type = "date" id="update-strat-${id}"/> 
            <input type = "date" id="end-strat-${id}"/> 
            <div>
                <button class = "update-save" update-save-id="${id}">add</button>
                <button id="update-cancel">cancel</button>
            </div>
        </div>`
    }

    //create event data
    createEvent(event){
        //tr- contains the event
        const eventElement = document.createElement('tr')
        eventElement.classList.add('event')
        eventElement.setAttribute("id",`event-${event.id}`)
        //event Title
        const eventTitle = document.createElement('th')
        eventTitle.classList.add('title')
        eventTitle.setAttribute("id",`title-${event.id}`)
        eventTitle.textContent = event.eventName
        //start date
        const startDate = document.createElement('th')
        startDate.classList.add('start-date')
        startDate.setAttribute("id",`start-${event.id}`)
        startDate.textContent = event.startDate
        //end date
        const endDate = document.createElement('th')
        endDate.classList.add('end-date')
        endDate.setAttribute("id",`end-${event.id}`)
        endDate.textContent = event.endDate
        //actions
        const actions = document.createElement('div')
        actions.classList.add('event-actions')
        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-btn')
        editBtn.setAttribute("edit-id",`${event.id}`)
        editBtn.innerHTML='<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>'
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.setAttribute("delete-id",`${event.id}`)
        deleteBtn.innerHTML= '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>'
        actions.append(editBtn,deleteBtn)


        eventElement.append(eventTitle,startDate,endDate,actions)
        return eventElement
    }
    //add element 
    createAddElement(id){
        //tr- contains the event
        const createElement = document.createElement('div')
        createElement.classList.add('add-event')
        createElement.setAttribute("id",`add-event`)
        //event Title
        const eventTitle = document.createElement('input')
        eventTitle.setAttribute("type",`text`)
        eventTitle.setAttribute("id",`input-title`)
        const startDate = document.createElement('input')
        startDate.setAttribute("type",`date`)
        startDate.setAttribute("id",`add-startDate`)
        const endDate = document.createElement('input')
        endDate.setAttribute("type",`date`)
        endDate.setAttribute("id",`add-endDate`)    
        const actions = document.createElement('div')
        actions.classList.add('event-actions')
        const saveBtn = document.createElement('button')
        saveBtn.classList.add('save-btn')
        saveBtn.setAttribute("id",`saveBtn`)
        saveBtn.innerHTML= '<svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        const cancelBtn = document.createElement('button')
        cancelBtn.classList.add('cancel-btn')
        cancelBtn.setAttribute("id",`cancleBtn-${id}`)
        cancelBtn.innerHTML= '<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>'
        actions.append(saveBtn,cancelBtn)
        createElement.append(eventTitle,startDate,endDate,actions)
        return createElement
    }
    // createUpate(id){
    //     //tr- contains the event
    //     const createElement = document.createElement('div')
    //     createElement.classList.add('add-event')
    //     createElement.setAttribute("id",`add-event`)
    //     //event Title
    //     const eventTitle = document.createElement('input')
    //     eventTitle.setAttribute("type",`text`)
    //     eventTitle.setAttribute("id",`input-title-${id}`)
    //     const startDate = document.createElement('input')
    //     startDate.setAttribute("type",`date`)
    //     startDate.setAttribute("id",`add-startDate-${id}`)
    //     const endDate = document.createElement('input')
    //     endDate.setAttribute("type",`date`)
    //     endDate.setAttribute("id",`add-endDate-${id}`)    
    //     const actions = document.createElement('div')
    //     actions.classList.add('event-actions')
    //     const saveBtn = document.createElement('button')
    //     saveBtn.classList.add('save-btn')
    //     saveBtn.setAttribute("saveBtn-id",`${id}`)
    //     saveBtn.innerHTML= '<svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    //     const cancelBtn = document.createElement('button')
    //     cancelBtn.classList.add('cancel-btn')
    //     cancelBtn.setAttribute("id",`cancleBtn-${id}`)
    //     cancelBtn.innerHTML= '<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>'
    //     actions.append(saveBtn,cancelBtn)
    //     createElement.append(eventTitle,startDate,endDate,actions)
    //     return createElement
    // }

   
     
}


//Controller**********************************************************
class EventsController{
    constructor(model,view){
        this.model = model
        this.view = view
        this.initController()
    }
    async initController(){
        this.setUpEvents()
        await this.model.fetchEvents()
        const events = this.model.getEvents()
        this.view.initRenderEvents(events)
    }
    setUpEvents(){
        this.setUpaddEvents()
        this.setUpPostEvent()
        this.setUpDeleteEvent()
        this.setUpUpdateEvent()
    }
    setUpaddEvents(){
        this.view.addEventBtn.addEventListener("click",()=>{
            const createElement = this.view.createAddElement(0)
            this.view.appendAddEvent( this.view.createAddElement(0))
        })
    }
    setUpPostEvent(){
        this.view.eventsList.addEventListener("click",(e)=>{
            if(e.target.classList.contains('save-btn')){
                let value =this.view.findValue()
                console.log(value)
                if(value.title!=='' && value.startDate!=='' && value.endDate!==''){
                    const newEvent = {eventName: value.title, startDate:value.startDate, endDate: value.endDate}
                    this.model.postEvent(newEvent).then(newEvent =>this.view.appendEvent(newEvent)).then(this.view.deleteAdd())
                }
                else{
                    //add alr
                }
            
            }
            else if(e.target.classList.contains('cancel-btn')){
                this.view.deleteAdd()
            }
        })
    }
    setUpDeleteEvent(){
        this.view.eventsList.addEventListener("click",(e)=>{
            if(e.target.classList.contains('delete-btn')){
                const removeId = e.target.getAttribute("delete-id")
                console.log(removeId)
                this.model.deleteEvent(removeId).then(
                    ()=>{this.view.deleteRenderEvent(removeId)}
                )
            }
        })
    }
    setUpUpdateEvent(){
        this.view.eventsList.addEventListener("click",(e)=>{
            if(e.target.classList.contains('edit-btn')){
                const updateId = e.target.getAttribute("edit-id")
                console.log(updateId)
                this.view.updateEventHandeler(updateId)
            }
            else if(e.target.classList.contains('update-save')){
                const updateId = e.target.getAttribute("update-save-id")
                console.log(updateId)
                // this.view.updateEventHandeler(updateId)
            }
        })
        
    }
    
}

const model = new EventsModel()
const view = new EventsView()
const controller = new EventsController(model,view)