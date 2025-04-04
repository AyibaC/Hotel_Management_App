class Room {
    constructor({
        number,
        size
    }) {
        if (number < 101 || number > 999) {
            throw new Error(`Room number must be a 3 digit number starting at 101, received ${number}`)
        }
        if (typeof number !== "number") {
            throw new Error(
                `Room number must be a number. Received ${number} (of type ${typeof number})`)
        }
        this.number = number;
        this.size = size;
        this.isOccupied = false;
        this.occupant = {
            name: null,
            creditCardNumber: null
        };
    }
}


class Guest {
    //static #creditCardNumber
    static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
            c
        ) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    constructor({
        firstName = "",
        lastName = "",
        sizeDesired
    }) {
        if (typeof firstName !== "string") {
            throw new Error(
                `The first name of a guest must be a string. Received ${firstName} (of type ${typeof firstName})`)
        }
        if (typeof lastName !== "string") {
            throw new Error(
                `The last name of a guest must be a string. Received ${lastName} (of type ${typeof lastName})`)
        }
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.sizeDesired = sizeDesired;
        this.creditCardNumber = Guest.uuidv4();
        this.roomNumber = 0;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

}



class Hotel {
    rooms = []
    guests = []
    constructor(name) {
        if (typeof name !== "string") {
            throw new Error(`The name of a hotel must be a string. Received ${name} (of type ${typeof name})`)
        }
        this.name = name;
    }
    addRoom(room) {
        if (!(room instanceof Room)) {
            throw new Error('Room is of the wrong format. Please use the Room class to create room.')
        }
        if (this.rooms.some((existingRoom) => existingRoom.number === room.number)) {
            throw new Error('Room number already exists. Please choose another room number.')
        }
        this.rooms.push(room);
        return this.rooms;

    }
    addGuest(guest) {
        if (!(guest instanceof Guest)) {
            throw new Error('Guest is of the wrong format. Please use the Guest class to create guest.')
        }
        this.guests.push(guest);

    }
    getRooms() {
        return this.rooms
    }
    getGuests() {
        return this.guests
    }
    getRoomByNumber(number) {
        return this.rooms.find((room) => room.number === number);
    }
    getGuest({
        firstName,
        lastName,
        creditCardNumber
    }) {
        return this.guests.find((existingGuest) => existingGuest.firstName === firstName.trim() && existingGuest.lastName === lastName.trim() && existingGuest.creditCardNumber === creditCardNumber)
    }
    getRoomsForGuest(guest) {
        const availableRooms = this.rooms.filter(room => room.size === guest.sizeDesired && room.isOccupied === false);
        console.log('availableRooms: ', this.rooms);
        if (!availableRooms) {
            return "Sorry, there are no rooms available fitting your needs"
        } else {
            return availableRooms

        }
    }
    checkIn(guest, room) {
        if (!(guest instanceof Guest)) {
            throw new Error('Guest is of the wrong format. Please use the Guest class to create a guest.')
        }

        {
            room.isOccupied = true
            room.occupant.name = guest.fullName
            room.occupant.creditCardNumber = guest.creditCardNumber
            guest.roomNumber = room.number
            return room, guest
        }
    }
    changeRoom({
        changeNumber,
        changes
    }) {
        const changeRoom = this.rooms.find((room) => room.number === changeNumber);
        for (const key in changes) {
            if (changeRoom.isOccupied === true) {
                throw new Error('Room is occupied. Please check out guest before updating room.')
            } else if (changes.hasOwnProperty(key)) {
                changeRoom[key] = changes[key];
                return changeRoom;
            }
        }
    }
    checkOut(guest, room) {
        if (!(guest instanceof Guest)) {
            throw new Error('Guest is of the wrong format. Please use the Guest class to create a guest.')
        }
        if (room.number === guest.roomNumber) {
            console.log('room number:', room.number, 'guest number:', guest.roomNumber, 'room type:', typeof(room.number), 'guest type:', typeof(guest.roomNumber))
            room.isOccupied = false;
            room.occupant = {
                name: null,
                creditCardNumber: null
            };
            guest.roomNumber = 0;
            return 'Check out successful' + room
        } else {
            console.log('room number:', room.number, 'guest number:', guest.roomNumber, 'room type:', typeof(room.number), 'guest type:', typeof(guest.roomNumber))
            'You are not the occupant of this room, check out unsuccessful'
        }
    }
    removeRoom(number) {
        let roomIndex = this.rooms.findIndex((room) => room.number === number);
        console.log('index', roomIndex);
        if (roomIndex === -1) {
            console.warn(`Room number ${number} not found`);
            return null;
        }
        this.rooms.splice(roomIndex, 1);
        console.log('rooms after removal', this.rooms);
        return this.rooms;
    }
}



//create hotel
const ritz = new Hotel('ritz')


const checkInContent = document.querySelector(".check-in-tab-content");

const checkInTab = document.getElementById("check-guest-in-tab");

const checkOutTab = document.getElementById("check-guest-out-tab");

const viewContent = document.getElementById("view-tab-content");

const viewTab = document.querySelector(".view-tab");

const viewRoomsTab = document.getElementById("view-rooms-tab");

const noRooms = document.getElementById('no-rooms-message');

const roomAdd = document.querySelector('.add-room-accord');
const removeRoom = document.querySelector('.remove-room-accord');
const updateRoom = document.querySelector('.update-room-accord');


function renderViewTab(roomList) {
    if (Array.isArray(roomList) && roomList.length) {
        viewContent.innerHTML = ``;
        viewContent.classList.add("uk-grid-small");
        viewContent.setAttribute("uk-grid", true);
        for (const room of roomList) {
            console.log(room);
            const tile = document.createElement("div");
            const tileWrapper = document.createElement("div");
            tileWrapper.classList.add("tile-wrapper", "uk-width-1-2", "uk-width-1-3@s");
            viewContent.appendChild(tileWrapper);
            const roomTile = tileWrapper.appendChild(tile);
            roomTile.classList.add("uk-card", "uk-card-primary", "uk-card-body")
            roomTile.innerHTML = `<h3 class="uk-card-title">Room ${room.number}</h3>
                <h4 class="uk-card-title">${room.size.charAt(0).toUpperCase() + room.size.slice(1)}</h4>
                <p>${room.isOccupied?"Occupied":"Unoccupied"}</p>`;
        }
    } else {
        viewContent.innerHTML = ``;
        viewContent.classList.remove("uk-grid-small");
        viewContent.removeAttribute("uk-grid");
        const message = document.createElement("p");
        message.id = 'no-rooms-message';
        message.classList.add("uk-text-center");
        message.innerHTML = `There are currently no rooms in your hotel. <br><a href="#" uk-switcher-item="3">Click here</a>&nbsp;to add rooms.`
        viewContent.appendChild(document.createElement("div"));
        viewContent.appendChild(message);
        viewContent.appendChild(document.createElement("div"));
        checkInTab.classList.add("uk-disabled");
        checkOutTab.classList.add("uk-disabled");
        removeRoom.classList.add("uk-disabled");
        updateRoom.classList.add("uk-disabled");
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    renderViewTab(ritz.getRooms());
    //open welcome modal on page refresh
    const welcomeModal = document.getElementById('welcome-modal');
    UIkit.modal(welcomeModal).show();
});


//enable rest of app when at least one room is added 
function enableApp(roomList) {
    if (Array.isArray(roomList) && roomList.length) {
        console.log("room status", typeof roomList, roomList.length)
        checkInTab.removeAttribute("class", "uk-disabled");
        checkOutTab.removeAttribute("class", "uk-disabled");
        if (removeRoom) {
            removeRoom.removeAttribute("class", "uk-disabled")
        };
        if (updateRoom) {
            updateRoom.removeAttribute("class", "uk-disabled")
        };
    }
};

enableApp(JSON.parse(localStorage.getItem('rooms')));

//disable parts of app if rooms get removed and hotel is empty again 
function disableApp(roomList) {
    if (Array.isArray(roomList) && roomList.length === 0) {
        console.log("room status", typeof roomList, roomList.length)
        checkInTab.setAttribute("class", "uk-disabled");
        checkOutTab.setAttribute("class", "uk-disabled");
        viewContent.className = '';
        viewContent.removeAttribute("uk-grid");
        console.log('view content tab: ', viewContent);
        if (roomAdd) {
            roomAdd.setAttribute("class", "uk-open")
        };
        if (removeRoom) {
            removeRoom.setAttribute("class", "uk-disabled")
        };
        if (updateRoom) {
            updateRoom.setAttribute("class", "uk-disabled")
        };
    }
};




viewTab.addEventListener("click", (e) => {
    e.preventDefault();
    renderViewTab(JSON.parse(localStorage.getItem('rooms')));
});



////CHECK GUEST IN TAB
const addFormSubmit = document.getElementById("add-form-submit");

const addGuestForm = document.getElementById("add-guest-form");

const roomOptionsContainer = document.getElementById("room-options-container");


function renderRoomOptions(roomList, guest) {
    roomOptionsContainer.innerHTML = ``;
    roomOptionsContainer.removeAttribute("class", "uk-hidden");
    const search = document.createElement("p");
    const searchedFor = roomOptionsContainer.appendChild(search);
    searchedFor.innerHTML = `You searched for a ${guest.sizeDesired} for ${guest.firstName} ${guest.lastName}`;
    if (roomList.length === 0) {
        const noRoomMessage = document.createElement("p");
        noRoomMessage.innerHTML = `Sorry, there are no rooms available fitting your needs`;
        noRoomMessage.classList.add('uk-text-center');
        roomOptionsContainer.appendChild(noRoomMessage);
        console.log('room options html', roomOptionsContainer.innerHTML);
    } else {
        for (const room of roomList) {
            const button = document.createElement("button");
            const roomButton = roomOptionsContainer.appendChild(button);
            roomButton.classList.add("uk-button", "uk-button-default", "uk-button-large", "room-button");
            roomButton.setAttribute("uk-toggle", "target: #check-in-modal")
            roomButton.setAttribute("data-room-number", `${room.number}`)
            roomButton.setAttribute("data-guest-first-name", `${guest.firstName}`)
            roomButton.setAttribute("data-guest-last-name", `${guest.lastName}`)
            roomButton.innerHTML = `Room ${room.number}`
        }
    }
};

function renderModalText() {
    const roomButton = document.getElementsByClassName("room-button");
    console.log(roomButton);
    for (const button of roomButton) {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const p = document.querySelector("#check-in-modal p");
            p.innerHTML = `Check guest ${button.dataset.guestFirstName} ${button.dataset.guestLastName} into room ${button.dataset.roomNumber}?`;
            const btn = document.querySelector("#check-in-modal .modal-check-in-button");
            btn.setAttribute("data-room-number", `${button.dataset.roomNumber}`);
        })
    }
};

const successCheckInModal = document.getElementById('successful-check-in-modal');

function renderSuccessModalText(guestObj) {
    const p = document.querySelector("#successful-check-in-modal p");
    p.innerHTML = `Guest successfully checked in. Their credit card number is ${guestObj.creditCardNumber}. Please make a note of this as you will need to check this guest.`
};

function checkGuestIn(guest) {
    const btn = document.querySelector("#check-in-modal .modal-check-in-button");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const room = ritz.getRoomByNumber(Number(btn.dataset.roomNumber));
        ritz.addGuest(guest);
        ritz.checkIn(guest, room);
        console.log('rooms after check in:', ritz.getRooms());
        localStorage.setItem('rooms', JSON.stringify(ritz.getRooms()));
        console.log(room);
        renderSuccessModalText(guest);
        UIkit.modal(successCheckInModal).show();
        roomOptionsContainer.innerHTML = ``
    })
};

addGuestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const guestFormData = new FormData(addGuestForm);
    const data = Object.fromEntries(guestFormData);
    data.firstName = data.firstName.trim();
    data.lastName = data.lastName.trim();
    console.log('name after trim', `${data.firstName} ${data.lastName}`);
    const guest = new Guest(data);
    console.log(guest);
    const roomList = ritz.getRoomsForGuest(guest);
    console.log(roomList);
    addGuestForm.reset();
    renderRoomOptions(roomList, guest);
    renderModalText();
    checkGuestIn(guest);
});


addGuestForm.addEventListener("reset", (e) => {
    e.preventDefault();
    const roomOptionsContainer = document.getElementById("room-options-container");
    roomOptionsContainer.innerHTML = ``;
});

//CHECK OUT TAB
checkOutTab.addEventListener('click', (e) => {
    e.preventDefault();
    const checkOutSelect = document.getElementById('check-out-room-select');
    checkOutSelect.innerHTML = `<option value="">Select Room</option>`;
    const roomList = JSON.parse(localStorage.getItem('rooms'));
    const occuppiedRooms = roomList.filter(room => room.isOccupied === true);
    for (const room of occuppiedRooms) {
        const option = document.createElement('option');
        const roomOption = checkOutSelect.appendChild(option);
        roomOption.setAttribute("value", `${room.number}`);
        roomOption.innerHTML = `Room ${room.number}`;
    }
});



function renderAllRoomOptions(select) {
    select.innerHTML = `<option value="">Select Room</option>`;
    for (const room of JSON.parse(localStorage.getItem('rooms'))) {
        const option = document.createElement('option');
        const roomOption = select.appendChild(option);
        roomOption.setAttribute("value", `${room.number}`);
        roomOption.innerHTML = `Room ${room.number}`;
    }
}

const checkOutForm = document.getElementById('check-out-form');

checkOutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkOutData = new FormData(checkOutForm);
    const data = Object.fromEntries(checkOutData);
    console.log(data);
    const roomNumber = Number(data.number);
    const room = ritz.getRoomByNumber(roomNumber);
    delete data.number;
    console.log('data', data);
    console.log('room', room);
    ///ERROR MESSAGE
    try {
        var guest = ritz.getGuest(data);
    } catch (error) {
        console.log('get guest error', error.message);
        UIkit.modal.alert('The guest details you entered were incorrect. Please try again.')
        throw error;
    }
    try {
        ritz.checkOut(guest, room);
        console.log('rooms after checkout:', ritz.getRooms());
        localStorage.setItem('rooms', JSON.stringify(ritz.getRooms()));
        UIkit.modal.dialog('<p class="uk-modal-body">Guest successfully checked out.</p>');
    } catch (error) {
        console.log('check out error', error.message);
        UIkit.modal.alert('The guest you entered is not the occupant of the room you entered. Please try again.')
        throw error;
    }
    checkOutForm.reset();
});




/////////////////////////EDIT TAB//////////////////////
const editTab = document.querySelector('.edit-tab');

const removeRoomAccord = document.getElementById('remove-room-accord');

const removeSelect = document.getElementById('remove-room-select');

removeRoomAccord.addEventListener('click', (e) => {
    e.preventDefault();
    renderAllRoomOptions(removeSelect);
});

const updateAccord = document.getElementById('update-room-accord');

const updateSelect = document.getElementById('update-room-select');

updateAccord.addEventListener('click', (e) => {
    e.preventDefault();
    renderAllRoomOptions(updateSelect);
});


const addRoomForm = document.getElementById('add-room-form');

addRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRoomData = new FormData(addRoomForm);
    const data = Object.fromEntries(newRoomData);
    data.number = Number(data.number);
    try {
        const room = new Room(data);
        console.log('room to add', room);
        ritz.addRoom(room);
        localStorage.setItem('rooms', JSON.stringify(ritz.getRooms()));
        UIkit.modal.dialog('<p class="uk-modal-body">Room successfully added.</p>');
        addRoomForm.reset();
        //enable rest of app when at least one room is added 
        enableApp(JSON.parse(localStorage.getItem('rooms')));
    } catch (error) {
        UIkit.modal.alert(error.message);
        addRoomForm.reset();
        throw error;
    }
});

const removeRoomForm = document.getElementById('remove-room-form');

removeRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const removeData = new FormData(removeRoomForm);
    const data = Object.fromEntries(removeData);
    ritz.removeRoom(Number(data.number));
    console.log('ritz.rooms after removal:', ritz.rooms)
    localStorage.setItem('rooms', JSON.stringify(ritz.getRooms()));
    console.log('local storage after removal:', localStorage.getItem('rooms'));
    removeRoomForm.reset();
    disableApp(JSON.parse(localStorage.getItem('rooms')));
    renderAllRoomOptions(removeSelect);
});


const updateRoomForm = document.getElementById('update-room-form');

//function to make one of two update fields required
document.addEventListener('DOMContentLoaded', function() {
    //array including two input fields
    const inputs = Array.from(document.querySelectorAll('input[id=update-room-number], select[id=update-room-size]'));
    console.log("update inputs", inputs);
    //event listener that takes whichever input isn't selected and sets the required property to false. FIGURE OUT WHAT !e.target.value.length MEANS AND HOW IT EVALUATES TO FALSE
    const inputListener = e => inputs.filter(i => i !== e.target).forEach(i => i.required = !e.target.value.length);
    //add event listener to each input field
    inputs.forEach(i => i.addEventListener('input', inputListener));
});

updateRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updateData = new FormData(updateRoomForm);
    const data = Object.fromEntries(updateData);
    console.log(data);
    for (const property in data) {
        if (data[property] === "") {
            delete data[property];
        }
    };
    console.log(data);
    const copiedData = Object.assign({}, data);
    for (const prop in data) {
        if (prop !== 'changeNumber') {
            delete data[prop];
        }
    }
    delete copiedData.changeNumber;
    data.changes = copiedData;
    data.changeNumber = Number(data.changeNumber);
    if (data.changes.hasOwnProperty('number')) {
        data.changes.number = Number(data.changes.number)
    };
    console.log(data);
    try {
        ritz.changeRoom(data);
        localStorage.setItem('rooms', JSON.stringify(ritz.getRooms()));
        UIkit.modal.dialog('<p class="uk-modal-body">Room successfully updated</p>')
    } catch (error) {
        console.log(error.message);
        UIkit.modal.alert('Room is occupied. Please check out guest before updating room.');
    }
    updateRoomForm.reset();
});


console.log("all rooms", ritz.getRooms());