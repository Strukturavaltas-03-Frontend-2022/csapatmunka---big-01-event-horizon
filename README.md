# str3-final-project

|2022.11.28. - ver. 1.00

- Generated all data tables on Mockaroo
- Added data tables to Firebase Realtime database
- Added data models
- Added services for all entities with full CRUD capabilities
- Added List component with dynamically filled table
- Added 4 buttons to Home component that navigates to the List component with the selected data
- Added loading spinner to Home component
- Updated routes and navigation
- Refined headers for all data tables
- Added loading spinners to all delete events

|2022.12.01. - ver. 1.05

- Data fetching services got merged into one general service
- Components have access to all data tables at all times through data relay service
- Sidebar menu links got added and updated and navigate to the listing page displaying the selected data
- The listing component now features a dynamic paginator (ngx-pagination), sorting by headers, filtering by all header types and a table wide create button at the top to add new items
- Ng-Toastr got added to the project library
- Deleting a record displays a toast message in the top right corner and updates the table and database aswell
- Editing a record navigates to the editor page with the chosen item
- Refurbished data-table component to make it dumber
- Top navigation / Breadcrumb updated
- Minor visual changes to color-scheme

|2022.12.02. - ver. 1.10

- Added option to fetch all entities together
- Added ticker component to all pages, which displays some statistics about products and customers, orders on the bottom of the page
- Relay data service got extended with multiple setter/getter helper functions for ticker and other components
- Datasets got updated and linked to fit specification better
- Nested data filtering and sorting got fixed in listing tables

|2022.12.03. - ver. 1.15

- Updated models in preparation of data editor
- Added data editor with dynamically generated reactive form inputs
- Added New Item / Edit item CRUD functionality
- Toastr messages got updated accordingly

