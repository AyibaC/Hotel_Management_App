# Hotel Management App

This is an app to simulate the management of a hotel. 

## Tech stack 
- Vanilla JavaScript 
- UIKit 

## How to use
### Add Room
To use the app you first have to add rooms by going to the edit rooms tab. There can only be one room with each number. Rooms can now be viewed in the home tab and automatically have an unoccupied status. 

### Add Guest
Once the hotel has rooms you can add guests. Guests have a first name, last name and a desired room size. Guests can only be checked in to rooms of their desired size. Once the guest is added they will have a credit card number auto generated for them which is printed in the console. Take note of this as it will be needed to check the guest out. The point of this number being generated is to simulate the guest handing over credit card details at the start of their stay. 

### Check In
To check guests in go to the check in tab. Fill out the name of the guest you wish to check in and click search for rooms. The app will show the list of rooms with the size that the guest requires. Pick one and click check guest in. The room you checked the guest into will now show a status of occupied. 

### Check Out
To check guests out go to the check guest out tab. Enter the first and last name of your guest and the credit card number. If the credit card number is incorrect you will not be able to check the guest out. This is to simulate a security check to ensure the guest is the actual occupant of the room. 

### Edit Rooms
You can update and delete rooms in the edit rooms tab but rooms must be unoccupied for you to do so. If the room is occupied check the guest out first and then edit the room. 