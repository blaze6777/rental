# Horizon Rental Manager v0.5.0

This version redesigns the actual game around a national rental-car branch workflow.

## Major v0.5.0 changes
- Main gameplay screen now resembles a real rental branch operating dashboard.
- Customer queue on the left with wait time and next-hour arrivals.
- Selected customer physically appears at the desk with changing dialogue.
- Central rental computer shows contact info, loyalty, reservation, dates, class, rate, type, and status.
- Optional rental products are selectable from the counter screen.
- Exact ready vehicle can be assigned directly to today's rental.
- Full vehicle-assignment list shows unit, model, class, mileage, fuel, and cleanliness.
- Ready Row, Return Lane, Cleaning Bay, Fueling, Maintenance, and Manager Office are visible simultaneously.
- Six numbered cleaning bays have live countdown timers.
- Dirty cars wait in a cleaning queue until a bay is available.
- Finished cleaning sends the vehicle to Fueling or Ready automatically.
- Fueling sends completed cars back to Ready.
- Returned rentals enter Return Lane and move through inspection/cleaning.
- Live bottom KPIs for cars on lot, rentals, returns, utilization, satisfaction, revenue, labor, and branch status.
- Dashboard, Reservations, Fleet, Employees, Maintenance, Reports, and Corporate screens remain available.
- Save/load retained.
- Space = Run/Pause; D = advance 15 minutes.

## GitHub Pages
Replace the existing files in your `rental` repository with:
- index.html
- style.css
- app.js
- README.md

Then commit the changes. GitHub Pages will update automatically.


## v0.5.0 stability fixes
- Simulation time is dramatically slower.
- Normal speed is 1 game minute every 2.5 real seconds.
- Slow speed is 1 game minute every 5 real seconds.
- Fast speed is 2 game minutes every 1.5 real seconds.
- Added +5 minute manual advance.
- Counter remains paused until the user starts it.
- Discuss Protection now opens a real protection-product workflow.
- Check ID / Payment now actually verifies the customer and is required before checkout.
- Modify Reservation now edits class, days, and rate.
- Other Options now performs real add/remove actions.
- Offer Upgrade now changes the vehicle list to upgrade choices.
- Vehicle assignment is now a two-step workflow: Select Vehicle -> Assign & Complete Rental.
- Selected vehicle is visibly highlighted and summarized before checkout.
- Vehicle availability is rechecked when the rental is finalized.


## v0.5.0 — Required customer walk-around
- Assigning a vehicle no longer means the customer immediately drives away.
- The rental agreement is created first, then the exact vehicle moves to `Walk-Around`.
- A customer walk-around is required before the car becomes `Rented`.
- Walk-around records mileage out and fuel out.
- Inspect Front, Rear, Driver Side, Passenger Side, Windshield/Glass, Wheels/Tires, Roof, and Interior.
- Existing vehicle damage is shown during the walk-around.
- You can acknowledge existing damage or document scratches, dents, chips/cracks, scuffs, and stains before release.
- Newly documented pre-rental damage is permanently stored on that exact vehicle's damage history.
- Completing the walk-around releases the vehicle to the customer.
- The rental can be cancelled during walk-around and the vehicle returns to Ready.
- Return processing now compares return condition to the checkout walk-around.
- New return damage is permanently added to that exact vehicle's history and marked as return damage.
