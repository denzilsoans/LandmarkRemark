## Landmark Remark Solution

The Solution is an SPA, built using .NET Core 2.0, Entity Framework 2.1 (Data persistence), Angular 4, Bootstrap (responsive). Visual studio 2017 was used as the code editor. Data is saved in local sql db. Dependency Injection is achieved using Automapper. Webpack is used as the module bundler. 

# Solution Build and Run
1. Dependent Nuget Packages should be automatically installed on first build. OIf not, Right click on the project -> Manage
2. Node Packages will also be installed on first build, if not install using the npm-install command by pointing to the folder path where the project.json is present in the command prompt.
3. Once the solution loads, navigate to View > Other Windows >  Package Manager console and type the command "update-database". This will create a new local db,create the required tables for the application and seed the users table with test users. In case there are any issues with the connection string please change the local server name in the connection string mentioned in the appsettings.json file "LandmarkContext" attribute.
4. Run the application using F5 or Ctrl+F5 (without debugging). App will automatically default to http://localhost:33979/
5. In the login screen, use one of the below user credentials to login.
	
   | UserName | Password | 
   |----------|:--------:|
   | Test1    | 123456   |
   | Test2	  | 123456   |
   | Test3    | 123456   |
 
# Overview
Once logged in, the home screen contains the below items.
1. Logout button (top right corner) - redirect to the login screen and clear user data in the local storage.
2. Google Map (top center) - A green marker shows the current location of the user.Any location saved by me or other users will show with a red mark. Each of these markers can be clicked,doing so will display the longitude, latitude, notes, username and the date. (User story 3,4 - Notes can be seen in the table below as well)
3. Go to My Location (below gmap)- redirects the maps to the current location of the user. (User Story 1)
4. Add Current Location (below gmap)- Will open a form to save the users current location along with a note. (User Story 2)
5. Search by UserName & Remarks - Filters the saved notes by the text entered in the field. (User Story 5)
6. Table which shows all the saved records with columns Address,Remarks,Username,Date Created (User story 3,4 - Notes can be see on the map as well)

# Known Issues/ Limitations
1. No error message in the login screen if an invalid user has been entered. It simply does not login.
2. No validation in the note pop up. Current location can be saved without a note.
3. Application is built only in one layer. Ideally it has to be split into Business,Data Access and entity layers.
4. UI can be improved a lot. I have concentrated mainly on the functionality.
5. jwt Token based authentication is not fully implemented or tested.
6. No unit tests on the UI side & Server Side.

# Time line (approx 13hrs)
 * Architectural design - 3 hrs
 * UI Design - 4 hrs
 * Server Side Code - 3 hrs
 * ORM,database creation and seed - 2 hrs
 * Documentation - 30 mins

# ScreenShots
Home Page
![Home](/Screenshots/Home.JPG "Home Page")
Login Page
![Login](/Screenshots/Login.JPG "Login Page")
Add Notes Page
![AddNotes](/Screenshots/AddNotes.JPG "Add Notes Page")
