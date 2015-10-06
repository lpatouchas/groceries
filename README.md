##Groceries App

Simple AngularJs Groceries App with rest communication with a simple java backend.

###Features:###
1. Add / remove / delete / edit items (name, price, quantity) from your groceries list
2. Rest communication with a simple backend
3. Undo action feature
4. Calculate the total amount that you will spend in the next visit to the groceries store (sum the unchecked items)
5. Calculate the total amount of the current sessions checked items (do double check the total in the casier)
6. Filter both checked and unchecked lists during the addition of a new product, so that you can restore the previously added one (if you chose to not restore it but you add the same name with different price or quantity, the old one will be updated and restored automaticaly).
7. spinner notification on the top right, that shows the rest activity.
8. nav bar on the top for the total amount and item nubmer info plus a hiden (tap the blue nav to expand it) div that contains the add item fields
9. nav bar on the bottom that is the history information div with the restore button holder.
10. modals for delete and edit actions.
11. constant (every 30 seconds) polling of the server for fetching background updates (form other user) of the list.

**Mostly implemented for fun and it is should not be used as a proper example of anything. It certainly needs refactoring to comply with best practices :)**
 
