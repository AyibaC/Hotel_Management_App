class Room {
    constructor({number, size}){
        if(number<101 || number>999){
            throw new Error(`Room number must be a 3 digit number starting at 101, received ${number}`)
        }
        if (typeof number !== "number") {
            throw new Error(
            `Room number must be a number. Received ${number} (of type ${typeof number})`)}
        this.number = number; //In future autogenerate number when adding to array of rooms
        this.size = size; 
        this.isOccupied = false;
        this.occupant = {name: null,
                        creditCardNumber: null};
        } 
    }
  // const room1 = new Room({number: 101, size: 'double'})
  // console.log(room1)

  // const room2 = new Room({number: 102, size:'twin'})
  // console.log(room2)

    class Guest {
        //static #creditCardNumber
        static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        }
        constructor({firstName="", lastName="", sizeDesired}){
        if (typeof firstName !== "string") {
            throw new Error(
            `The first name of a guest must be a string. Received ${firstName} (of type ${typeof firstName})`)}
        if (typeof lastName !== "string") {
            throw new Error(
            `The last name of a guest must be a string. Received ${lastName} (of type ${typeof lastName})`)}
        this.firstName = firstName;
        this.lastName = lastName;
        this.sizeDesired = sizeDesired;
        this.creditCardNumber = Guest.uuidv4();
        this.roomNumber = 0;
        }
        get fullName(){
        return `${this.firstName} ${this.lastName}`
        }
        // getCreditCardNumber(){
        //   return this.#uuidv4();
        // }
        
    }

  // const guest1 = new Guest({firstName:'Ayiba', lastName:'Cesario', sizeRequired:'double'})
  // console.log('guest 1', guest1)

    class Hotel {
        rooms = []
        guests = []
        constructor(name){
        if(typeof name !== "string"){
            throw new Error(`The name of a hotel must be a string. Received ${name} (of type ${typeof name})`)
        }
        this.name = name;
        }
        addRoom(room){
        if(!(room instanceof Room)){
            throw new Error('Room is of the wrong format. Please use the Room class to create room.') 
        } 
        if(this.rooms.some((existingRoom) => existingRoom.number === room.number)){
            throw new Error('Room number already exists. Please choose another room number.')
        }
        this.rooms.push(room);
        return this.rooms;
        //this.save();
        }
        addGuest(guest){
        if(!(guest instanceof Guest)){throw new Error('Guest is of the wrong format. Please use the Guest class to create guest.') 
        } 
        this.guests.push(guest);
        //this.save();
        }
        getRooms(){
        return this.rooms
        }
        getGuests(){
        return this.guests
        }
        getRoomByNumber(number){
        return this.rooms.find((room) => room.number === number);
        }
        getGuest({firstName, lastName, creditCardNumber}){
        return this.guests.find((existingGuest)=>existingGuest.firstName === firstName && existingGuest.lastName === lastName && existingGuest.creditCardNumber === creditCardNumber)
        }
        getRoomsForGuest(guest){
        const availableRooms = this.rooms.filter(room => room.size === guest.sizeDesired && room.isOccupied === false);
        if (availableRooms === []){
            return "Sorry, there are no rooms available fitting your needs"
        } else {
            return availableRooms
        //   }
        //   for (const roomIndex of this.rooms.findIndex((room) => room.size === guest.sizeDesired)){
        // if (roomIndex === -1){
        //   return "Sorry, there are no rooms available fitting your needs"
        // } else if(this.rooms[roomIndex].isOccupied === false){ availableRooms.append(this.rooms[roomIndex]);
        // }
        //     return availableRooms
        }}
        checkIn(guest,room){
        if(!(guest instanceof Guest)){throw new Error('Guest is of the wrong format. Please use the Guest class to create a guest.')} 
        //   }
        //   let roomIndex = this.rooms.findIndex((room) => room.size === guest.sizeDesired); 
        // if (roomIndex === -1){
        //   return "Sorry, there are no rooms available fitting your needs"
        // } else if(this.rooms[roomIndex].isOccupied === false){
            {room.isOccupied = true
            room.occupant.name = guest.fullName
            room.occupant.creditCardNumber = guest.creditCardNumber
            guest.roomNumber = room.number
            return room, guest}
        }
        changeRoom({changeNumber, changes}){
        const changeRoom = this.rooms.find((room) => room.number === changeNumber);
        for (const key in changes) {if(changeRoom.isOccupied === true){
            throw new Error('Room is occupied. Please check out guest before updating room.')
        } else if(changes.hasOwnProperty(key)) {
            changeRoom[key] = changes[key];
            return changeRoom;
            }
        }
    }
    checkOut(guest, room){
        if(!(guest instanceof Guest)){throw new Error('Guest is of the wrong format. Please use the Guest class to create a guest.') 
        }
        if(room.number === guest.roomNumber){
            console.log('room number:', room.number, 'guest number:', guest.roomNumber, 'room type:', typeof(room.number), 'guest type:', typeof(guest.roomNumber))
            room.isOccupied = false;
            room.occupant = null;
            guest.roomNumber = 0;
            return 'Check out successful'+ room
        } else {
            console.log('room number:', room.number, 'guest number:', guest.roomNumber, 'room type:', typeof(room.number), 'guest type:', typeof(guest.roomNumber))
            'You are not the occupant of this room, check out unsuccessful'
        }
    }
    removeRoom(number){
        let roomIndex = this.rooms.findIndex((room) => room.number === number);
        console.log('index', roomIndex);
        if(roomIndex === -1) { 
            console.warn(`Room number ${number} not found`);
            return null;
        }
        this.rooms.splice(roomIndex, 1);
        console.log('rooms after removal', this.rooms);
        return this.rooms;
    }
    }

  // const room3 = new Room({number: 103, size: 'suite'});
  // const room4 = new Room({number:104, size: 'double'});
  // const room5 = new Room({number:105,size: 'double'})


  //create hotel
    const ritz = new Hotel('ritz')
  // console.log(ritz)

  //add rooms
  // ritz.addRoom(room1)
  // ritz.addRoom(room2)
  // ritz.addRoom(room3)
  // ritz.addRoom(room4)
  // ritz.addRoom(room5)
  //read all rooms


  //check guest in
  // ritz.checkIn(guest1)
  // console.log(ritz.getRooms())

  //read one room
  // console.log(ritz.getRoomByNumber(102))

  //update room
  // ritz.changeRoom(102, {
  //   size: 'single'
  // })
  // console.log(ritz.getRoomByNumber(102))

  //delete room expecting success
  //ritz.removeRoom(103)
  //delete room expecting failure
  //ritz.removeRoom(104)
  // console.log(ritz.getRooms())

  // ritz.addRoom('Ayiba')

  // const guest2 = new Guest({firstName: 'Ojaba', lastName:'Cesario', sizeDesired: 'double'});

  //ritz.checkIn(guest2);
  // console.log(ritz.getRooms());

  // console.log(guest2.getCreditCardNumber())

  // console.log(ritz.checkOut(guest2));
  // console.log(ritz.getRoomByNumber(101));

    const checkInContent = document.querySelector(".check-in-tab-content");
    
    const checkInTab = document.getElementById("check-guest-in-tab");
    
    const checkOutTab = document.getElementById("check-guest-out-tab");
    
    const viewContent = document.getElementById("view-tab-content");
    
    const viewTab = document.querySelector(".view-tab");
    
    const viewRoomsTab = document.getElementById("view-rooms-tab");
    
    const noRooms = document.getElementById('no-rooms-message');


    document.addEventListener("DOMContentLoaded", (e)=>{
        e.preventDefault();
        const rooms = ritz.getRooms();
        for (const {number, size, isOccupied, occupant} of rooms){
        const tile = document.createElement("div");
        const tileWrapper = document.createElement("div");
        tileWrapper.classList.add("tile-wrapper");
        viewContent.appendChild(tileWrapper);
        const roomTile = tileWrapper.appendChild(tile);
        //roomTile.classList.add("tile");
        roomTile.classList.add("uk-card", "uk-card-primary", "uk-card-body")
        roomTile.innerHTML = `<h3 class="uk-card-title">Room ${number}</h3>
        <h4 class="uk-card-title">${size.charAt(0).toUpperCase() + size.slice(1)}</h4>
        <p>${isOccupied?"Occupied":"Unoccupied"}</p>`;
        //console.log(roomTile.innerHTML);
        }
    });
    
    viewTab.addEventListener("click", (e)=>{
        e.preventDefault();
        const rooms = ritz.getRooms();
        // noRooms.hidden = true;
        viewContent.innerHTML = ``;
        for (const {number, size, isOccupied, occupant} of rooms){
        const tile = document.createElement("div");
        const tileWrapper = document.createElement("div");
        tileWrapper.classList.add("tile-wrapper");
        viewContent.appendChild(tileWrapper);
        const roomTile = tileWrapper.appendChild(tile);
        roomTile.classList.add("uk-card", "uk-card-primary", "uk-card-body")
        roomTile.innerHTML = `<h3 class="uk-card-title">Room ${number}</h3>
        <h4 class="uk-card-title">${size.charAt(0).toUpperCase() + size.slice(1)}</h4>
        <p>${isOccupied?"Occupied":"Unoccupied"}</p>`;
        //console.log(roomTile.innerHTML);
        }
    });
    
    console.log("room status" ,typeof JSON.parse(localStorage.getItem('rooms')));
    
    console.log('local storage', JSON.parse(localStorage.getItem('rooms')))
    

  ////CHECK GUEST IN TAB


  // checkInTab.addEventListener('click',(e) =>{
  // e.preventDefault();
  // checkInContent.removeAttribute("class", "uk-hidden");
  //   viewContent.setAttribute("class", "uk-hidden");
  //                             });

  // viewTab.addEventListener('click',(e)=>{
  //   e.preventDefault();
  // viewContent.removeAttribute("class", "uk-hidden");
  //   checkInContent.setAttribute("class", "uk-hidden");
  //                             });


    const addFormSubmit = document.getElementById("add-form-submit");
    
    const addGuestForm = document.getElementById("add-guest-form");
    
    const roomOptionsContainer = document.getElementById("room-options-container"); 


    function renderRoomOptions(rooms, guest){
    roomOptionsContainer.innerHTML = ``; 
    roomOptionsContainer.removeAttribute("class","uk-hidden");
    const search = document.createElement("p");
    const searchedFor = roomOptionsContainer.appendChild(search);
        searchedFor.innerHTML = `You searched for a ${guest.sizeDesired} for ${guest.firstName} ${guest.lastName}`;
        for (const room of rooms){
        if (rooms === []){
            const message = document.createElement("p");
            const noRoomMessage = roomOptionsContainer.appendChild(message);
            noRoomMessage.innerHTML = `Sorry, there are no rooms available fitting your needs`;
            console.log(roomOptionsContainer.innerHTML);
        } else {
        const button = document.createElement("button");
        const roomButton = roomOptionsContainer.appendChild(button);
        roomButton.classList.add("uk-button", "uk-button-default", "uk-button-large", "room-button");
            roomButton.setAttribute("uk-toggle","target: #check-in-modal")
            roomButton.setAttribute("data-room-number",`${room.number}`)
            roomButton.setAttribute("data-guest-first-name",`${guest.firstName}`)
            roomButton.setAttribute("data-guest-last-name",`${guest.lastName}`)
        roomButton.innerHTML = `Room ${room.number}`}
    }
    }; 

    addGuestForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const guestFormData = new FormData(addGuestForm);
        const data = Object.fromEntries(guestFormData);
        const guest = new Guest(data);
        console.log(guest);   
    const rooms =  ritz.getRoomsForGuest(guest);
            console.log(rooms);
        addGuestForm.reset();
        renderRoomOptions(rooms, guest);
        renderModalText();
        checkGuestIn(guest);
    });


    addGuestForm.addEventListener("reset",(e)=>{
        e.preventDefault;
        const roomOptionsContainer = document.getElementById("room-options-container"); 
        roomOptionsContainer.innerHTML = ``;
    });
    
    
    function renderModalText(){const roomButton = document.getElementsByClassName("room-button");
    console.log(roomButton);
    for (const button of roomButton){
    button.addEventListener("click",(e)=>{
        const p = document.querySelector("#check-in-modal p");
        p.innerHTML = `Check guest ${button.dataset.guestFirstName} ${button.dataset.guestLastName} into room ${button.dataset.roomNumber}?`;
        const btn = document.querySelector("#check-in-modal .modal-check-in-button");
        btn.setAttribute("data-room-number",`${button.dataset.roomNumber}`);
    })}};
    
    function checkGuestIn(guest){
        const btn = document.querySelector("#check-in-modal .modal-check-in-button");
        btn.addEventListener("click",(e)=>{
        e.preventDefault;
        const room = ritz.getRoomByNumber(Number(btn.dataset.roomNumber));
        ritz.addGuest(guest);
        ritz.checkIn(guest,room);
        console.log(room);
        roomOptionsContainer.innerHTML = ``
    })
    };


  //CHECK OUT TAB
    checkOutTab.addEventListener('click',(e)=>{
        e.preventDefault();
        const checkOutSelect = document.getElementById('check-out-room-select');
        checkOutSelect.innerHTML = `<option value="">Select Room</option>`;
        const rooms = ritz.getRooms();
        const occuppiedRooms = rooms.filter(room => room.isOccupied === true);
        for (const room of occuppiedRooms){
        const option = document.createElement('option');
        const roomOption = checkOutSelect.appendChild(option); roomOption.setAttribute("value",`${room.number}`);
        roomOption.innerHTML = `Room ${room.number}`;
    }
    });



    function renderAllRoomOptions(select){
        const rooms = ritz.getRooms();
        select.innerHTML = `<option value="">Select Room</option>`;
        for (const room of rooms){
        const option = document.createElement('option');
        const roomOption = select.appendChild(option); roomOption.setAttribute("value",`${room.number}`);
        roomOption.innerHTML = `Room ${room.number}`;
    }
    }

    const checkOutForm = document.getElementById('check-out-form');

    checkOutForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const checkOutData = new FormData(checkOutForm);
        const data = Object.fromEntries(checkOutData);
        console.log(data);
        const roomNumber = Number(data.number);
        const room = ritz.getRoomByNumber(roomNumber);
        delete data.number;
        console.log('data', data);
        console.log('room', room);
        ///ERROR MESSAGE PROBLEMS
        try{
            var guest = ritz.getGuest(data);
        } catch(error){
            console.log('get guest error',error.message);
            UIkit.modal.alert('The guest details you entered were incorrect. Please try again.')
            throw error;
        }
        try {
            ritz.checkOut(guest, room);
            UIkit.modal.dialog('<p class="uk-modal-body">Guest successfully checked out.</p>');
        } catch(error){
            console.log('check out error',error.message);
            UIkit.modal.alert('The guest you entered is not the occupant of the room you entered. Please try again.')
            throw error;
        } 
        checkOutForm.reset();
    });




    /////////////////////////EDIT TAB//////////////////////
    const editTab = document.querySelector('.edit-tab');

    editTab.addEventListener('click',(e)=>{
        //enable rest of app when at least one room is added 
        if (typeof ritz.rooms !== 'undefined' && ritz.rooms.length > 0){
            console.log("room status" ,typeof ritz.rooms, ritz.rooms.length)
            checkInTab.removeAttribute("class", "uk-disabled");
            checkOutTab.removeAttribute("class", "uk-disabled");
            const addRoom = document.querySelector('.add-room-accord');
            const removeRoom = document.querySelector('.remove-room-accord');
            const updateRoom = document.querySelector('.update-room-accord');
            if(addRoom){addRoom.removeAttribute("class", "uk-open")};
            if(removeRoom){removeRoom.removeAttribute("class", "uk-disabled")};
            if(updateRoom){updateRoom.removeAttribute("class", "uk-disabled")};
        } 
    });



    const removeRoomAccord = document.getElementById('remove-room-accord');
    
    const removeSelect = document.getElementById('remove-room-select');
    
    removeRoomAccord.addEventListener('click',(e)=>{
        e.preventDefault();
        renderAllRoomOptions(removeSelect);
    });
    
    const updateAccord = document.getElementById('update-room-accord');
    
    const updateSelect = document.getElementById('update-room-select');
    
    updateAccord.addEventListener('click',(e)=>{
        e.preventDefault();
        renderAllRoomOptions(updateSelect);
    });
    
    
    const addRoomForm = document.getElementById('add-room-form');
    
    addRoomForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const newRoomData = new FormData(addRoomForm);
        const data = Object.fromEntries(newRoomData);
        data.number = Number(data.number);
        const room = new Room(data);
        console.log('room to add',room);
        //ritz.addRoom(room);
        try{
            ritz.addRoom(room);
            localStorage.setItem('rooms',JSON.stringify(ritz.getRooms()));
            UIkit.modal.dialog('<p class="uk-modal-body">Room successfully added.</p>');
            addRoomForm.reset();
            //enable rest of app when at least one room is added 
            if (typeof ritz.rooms !== 'undefined' && ritz.rooms.length > 0){
                console.log("room status" ,typeof ritz.rooms, ritz.rooms.length)
                checkInTab.removeAttribute("class", "uk-disabled");
                checkOutTab.removeAttribute("class", "uk-disabled");
                const addRoom = document.querySelector('.add-room-accord');
                const removeRoom = document.querySelector('.remove-room-accord');
                const updateRoom = document.querySelector('.update-room-accord');
                if(addRoom){addRoom.removeAttribute("class", "uk-open")};
                if(removeRoom){removeRoom.removeAttribute("class", "uk-disabled")};
                if(updateRoom){updateRoom.removeAttribute("class", "uk-disabled")};
            }; 
        }catch(error){
            //console.log(error.message);
            UIkit.modal.alert('Room number already exists. Please choose another room number.')
            addRoomForm.reset();
            throw error;
        }  
    });
    
    const removeRoomForm = document.getElementById('remove-room-form');
    
    removeRoomForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const removeData = new FormData(removeRoomForm);
        const data = Object.fromEntries(removeData);
        ritz.removeRoom(Number(data.number));
        removeRoomForm.reset();
        renderAllRoomOptions(removeSelect);
    });


    const updateRoomForm = document.getElementById('update-room-form');
    
    //function to make one of two update fields required
    document.addEventListener('DOMContentLoaded', function () {
        //array including two input fields
        const inputs = Array.from(document.querySelectorAll('input[id=update-room-number], select[id=update-room-size]'));
        console.log("update inputs", inputs);
        //event listener that takes whichever input isn't selected and sets the required property to false. FIGURE OUT WHAT !e.target.value.length MEANS AND HOW IT EVALUATES TO FALSE
        const inputListener = e => inputs.filter(i => i !== e.target).forEach(i => i.required = !e.target.value.length);
    //add event listener to each input field
        inputs.forEach(i => i.addEventListener('input', inputListener));
    });
    
    updateRoomForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const updateData = new FormData(updateRoomForm);
        const data = Object.fromEntries(updateData);
        console.log(data);
        //console.log(data.size);
        for (const property in data){
            if(data[property] === ""){
                delete data[property];
                //console.log(data);
            }
        };
        console.log(data);
        const copiedData = Object.assign({}, data);
        for (const prop in data){
            if (prop !== 'changeNumber'){
                delete data[prop];
            }
        }
        delete copiedData.changeNumber;
        data.changes = copiedData;
        data.changeNumber = Number(data.changeNumber); 
        if(data.changes.hasOwnProperty('number')){
            data.changes.number = Number(data.changes.number)
            };
        console.log(data);
        try{
            ritz.changeRoom(data);
            UIkit.modal.dialog('<p class="uk-modal-body">Room successfully updated</p>')
        } catch(error){
            console.log(error.message);
            UIkit.modal.alert('Room is occupied. Please check out guest before updating room.');
        }
        updateRoomForm.reset();
    });


    console.log("all rooms", ritz.getRooms());
  // console.log("guest 1", guest1)