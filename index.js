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
    async updateEvent(id,newEvent){
        const todo = await API.updateEvent(id,newEvent)
        return todo
   }
   getEventById(id){
    return this.#events.find(element => element.id === parseInt(id))
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
        return {title,startDate,endDate}
        
    }

    findUpdateValue(id){
        const title = document.getElementById(`update-title-${id}`).value
        const startDate = document.getElementById(`update-strat-${id}`).value
        const endDate = document.getElementById(`update-end-${id}`).value
        return {title,startDate,endDate}
    }
    updateRender(newEvent){
        const event = this.createEvent(newEvent)
        const element = document.getElementById(`event-${newEvent.id}`)
        element.innerHTML = `
        <div class="title" id="event-${newEvent.id}">
            ${newEvent.eventName}
        </div>
        <div class="start-date" id="start-${newEvent.id}">
            ${newEvent.startDate}
        </div>
        <div class="end-date" id="end-${newEvent.id}">
            ${newEvent.endDate}
        </div>
        <div class="event-actions">
            <button class="edit-btn" edit-id=${newEvent.id}>
                <svg class="edit-svg" edit-id ="${newEvent.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path class="edit-svg" edit-id ="${newEvent.id}"  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            </button>
            <button class="delete-btn" delete-id=${newEvent.id}>
                <svg class="delete-svg" delete-id ="${newEvent.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path class="delete-svg" delete-id ="${newEvent.id}" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>
        </div>
        `

    }
    deleteAdd(){
        const element = document.getElementById(`add-event`)
        element.remove()
    }

    deleteRenderEvent(id){
        const element = document.getElementById(`event-${id}`)
        element.remove()
    }


    updateEventHandeler(id,curEvent){
        const element = document.getElementById(`event-${id}`)
        element.innerHTML= `

            <input type = "text" id="update-title-${id}" value="${curEvent.eventName}"/>
            <input type = "date" id="update-strat-${id}" value="${curEvent.startDate}"/> 
            <input type = "date" id="update-end-${id}" value="${curEvent.endDate}"/> 
            <div>
                <button class = "update-save" update-save-id="${id}"><svg class="update-save-svg" update-save-id="${id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="update-save-svg" update-save-id="${id}"  d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/></svg></button>
                <button class = "goBack-update" goback-update-id="${id}"><svg class="goBack-svg" goback-update-id="${id}" focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="goBack-svg" goback-update-id="${id}"  d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg></button>
            </div>
        `
    }

    //create event data
    createEvent(event){
        //tr- contains the event
        const eventElement = document.createElement('div')
        eventElement.classList.add('event')
        eventElement.setAttribute("id",`event-${event.id}`)
        //event Title
        const eventTitle = document.createElement('div')
        eventTitle.classList.add('title')
        eventTitle.setAttribute("id",`title-${event.id}`)
        eventTitle.textContent = event.eventName
        //start date
        const startDate = document.createElement('div')
        startDate.classList.add('start-date')
        startDate.setAttribute("id",`start-${event.id}`)
        startDate.textContent = event.startDate
        //end date
        const endDate = document.createElement('div')
        endDate.classList.add('end-date')
        endDate.setAttribute("id",`end-${event.id}`)
        endDate.textContent = event.endDate
        //actions
        const actions = document.createElement('div')
        actions.classList.add('event-actions')
        const editBtn = document.createElement('button')
        editBtn.classList.add('edit-btn')
        editBtn.setAttribute("edit-id",`${event.id}`)
        editBtn.innerHTML=`<svg class="edit-svg" edit-id ="${event.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path class="edit-svg" edit-id ="${event.id}"  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>`
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.setAttribute("delete-id",`${event.id}`)
        deleteBtn.innerHTML= `<svg class="delete-svg" delete-id ="${event.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path class="delete-svg" delete-id ="${event.id}" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`
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
        saveBtn.innerHTML= '<svg class="save-svg" focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path class="save-svg"  d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        const cancelBtn = document.createElement('button')
        cancelBtn.classList.add('cancel-btn')
        cancelBtn.setAttribute("id",`cancleBtn-${id}`)
        cancelBtn.innerHTML= '<svg class="cancel-svg" focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="cancel-svg"  d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>'
        actions.append(saveBtn,cancelBtn)
        createElement.append(eventTitle,startDate,endDate,actions)
        return createElement
    }
   
     
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
            if(e.target.classList.contains('save-btn')||e.target.classList.contains('save-svg')){
                let value =this.view.findValue()
                if(value.title!=='' && value.startDate!=='' && value.endDate!==''){
                    const newEvent = {eventName: value.title, startDate:value.startDate, endDate: value.endDate}
                    this.model.postEvent(newEvent).then(newEvent =>this.view.appendEvent(newEvent)).then(this.view.deleteAdd())
                }
                else{
                    alert("Input Not Valid!")
                }
            
            }
            else if(e.target.classList.contains('cancel-btn')||e.target.classList.contains('cancel-svg')){
                this.view.deleteAdd()
            }
        })
    }
    setUpDeleteEvent(){
        this.view.eventsList.addEventListener("click",(e)=>{
            if(e.target.classList.contains('delete-btn')||e.target.classList.contains('delete-svg')){
                const removeId = e.target.getAttribute("delete-id")
                this.model.deleteEvent(removeId).then(
                    ()=>{this.view.deleteRenderEvent(removeId)}
                )
            }
        })
    }
    setUpUpdateEvent(){
        this.view.eventsList.addEventListener("click",(e)=>{
            if(e.target.classList.contains('edit-btn')||e.target.classList.contains('edit-svg')){
                const updateId = e.target.getAttribute("edit-id")
                this.view.updateEventHandeler(updateId, this.model.getEventById(updateId))
            }
            else if(e.target.classList.contains('update-save')||e.target.classList.contains('update-save-svg')){
                const updateId = e.target.getAttribute("update-save-id")
                let value =this.view.findUpdateValue(updateId)
                if(value.title!=='' && value.startDate!=='' && value.endDate!==''){
                    const newEvent = {eventName: value.title, startDate:value.startDate, endDate: value.endDate}
                    this.model.updateEvent(updateId,newEvent).then(res =>this.view.updateRender(res))
                }
                else{
                    alert("Input Not Valid!")
                }
            }
            else if(e.target.classList.contains('goBack-update')||e.target.classList.contains('goBack-svg')){
                const updateId = e.target.getAttribute("goback-update-id")
                this.view.updateRender(this.model.getEventById(updateId))
            
            }
        })
        
    }
    
}

const model = new EventsModel()
const view = new EventsView()
const controller = new EventsController(model,view)