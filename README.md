# Horizon Rental Manager v0.9.4

This version redesigns the actual game around a national rental-car branch workflow.

## Major v0.9.4 changes
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


## v0.9.4 stability fixes
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


## v0.9.4 — Required customer walk-around
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

## v0.9.4 — Time speed correction
- The day now starts on Slow speed.
- Slow: 1 game minute every 60 real seconds.
- Normal: 1 game minute every 30 real seconds.
- Fast: 1 game minute every 10 real seconds.
- Manual +5 and +15 minute buttons remain available when you want to move ahead quickly.


## v0.9.4 — Living branch operations expansion
- Autonomous rental agents can serve customers while you manage the branch.
- Service staff move returned cars into the cleaning workflow.
- Live manager phone calls: rental extensions, insurance replacement rentals, body-shop referrals, roadside calls, and inter-branch transfer requests.
- Rental extensions can change fleet availability and revenue.
- Corporate, insurance, and body-shop account relationships.
- Other branches now have their own excess vehicle counts.
- Inter-branch transfer decisions.
- Employee years of service, pay, attendance, performance history, and call-offs.
- Key-control location tracked for every fleet unit.
- Preventive maintenance mileage and recall status added to vehicle records.
- Morning Fleet Meeting / whiteboard with reservations, returns, shortages, cleaning, maintenance, staffing, and fleet-balancing information.
- End-of-day close report.
- Operations screen for phone queue, DNR, overdue rentals, accounts, keys, and other branches.
- Area-manager visit messages.
- Career progression foundation.
- Existing damage/walk-around history remains permanently tied to each vehicle.

## v0.9.4 — Clock engine fix
- Replaced the repeating interval clock with a single self-scheduling timeout.
- A timer token prevents old/duplicate clock loops from continuing in the background.
- Slow is now exactly one game minute after 60 real seconds.
- Changing speed cancels the old timer before starting the new one.
- Pausing, loading, and advancing to the next day all hard-stop the timer.
- Added a visible countdown showing exactly how many real seconds remain until the next game minute.
- Added cache-busting version strings to app.js and style.css so GitHub Pages does not keep serving an older, faster JavaScript file.

## v0.9.4 — Operations screen repair
- Fixed the blank Operations page caused by older saves missing v0.6 fields.
- Added a save migration layer that fills in phone queue, DNR, overdue, accounts, branches, career, employee history, vehicle key data, and other newer state automatically.
- Older v0.4–v0.6.1 browser saves can now be loaded and upgraded.
- Operations rendering is now defensive so one missing field cannot blank the whole page.
- Updated cache-busting to v0.9.4.

## v0.9.4 — Daily operations simulation
- New Daily Planner screen with an hourly 7 AM–7 PM timeline.
- Pickups, projected returns, staffing, cleaning capacity, and projected class shortages are visible by hour.
- One-click inter-branch transfer requests from shortage cards.
- Transfers now have ETAs and arrive later instead of appearing instantly.
- Staff Assignment Board: Counter, Returns, Cleaning Bay, Fueling/Transfers, Pickup/Delivery, Maintenance Runner, Manager Office.
- Autonomous staff behavior now respects the jobs you assign them.
- Labor and cleaning costs accrue as the day runs; fueling, maintenance, and transfers have costs.
- Reports now show operating costs, branch profit, and multi-day history.
- Preventive maintenance can remove a Ready vehicle when service becomes due.
- Return agreements can generate fuel and heavy-clean charges.
- One-way rental events can remove a vehicle from the expected Warsaw return pool.
- Automatic recovery snapshots every 30 game minutes plus manual/end-of-day snapshots.
- Recovery screen allows restoring one of the latest snapshots.
- Keyboard shortcut P opens the Daily Planner.

## v0.9.4 — Deep customers, agreements, vehicles, and employees
- New persistent Customer CRM with loyalty, rental count, lifetime spend, preferences, complaints, notes, and DNR status.
- Customer preferences can affect satisfaction and vehicle-assignment outcomes.
- Protection is now presented as a customer conversation rather than only checkboxes.
- New formal rental agreement preview with renter, exact vehicle, base rental, protection/options, taxes, fees, estimated total, and card authorization/deposit.
- Payment authorization can approve or decline; agreement must be signed before the required vehicle walk-around.
- New Agreements screen with agreement and payment activity.
- Return Desk and final receipt with fuel, cleaning, late/extra, and damage charge fields.
- Vehicle profiles now have Overview, Rental History, Damage, Maintenance, Financials, and Ownership tabs.
- Vehicle financials include acquisition, lifetime rental revenue, estimated maintenance, wholesale value, and operating contribution.
- High-mileage vehicles can become disposal candidates and be sold from the fleet.
- Employee cards now allow real manager-office conversations about pay and development.
- Raises and development decisions become part of permanent employee history.
- Career XP now grows with daily performance and can unlock internal management opportunities.
- Calendar-year rollover increases employee tenure and depreciates fleet value.

## v0.9.4 — Physical branch & living-world update
- New Manager Office screen with clickable computer, phone, inbox, whiteboard, window, and calendar.
- Employees can knock on the manager's door with customer, scheduling, pay, and vehicle problems.
- New physical Parking Lot with numbered Ready, Return, Cleaning, Maintenance, and Overflow spaces.
- In-branch vehicles occupy actual spaces and can be manually moved.
- Roadside assistance cases can require roadside dispatch, replacement vehicles, or towing.
- Rare operational events include recalls, severe-weather extensions, card outages, major corporate requests, and transporter deliveries.
- New fleet deliveries require intake before entering rental service.
- Other Horizon branch managers now have persistent relationship scores that influence cooperation.
- Career can progress into Area Manager — Northeast Indiana.
- Area Manager mode oversees Warsaw, Columbia City, Goshen, Fort Wayne Airport, and Fort Wayne Downtown.
- The world layer is connected to the existing planner, fleet, employees, financials, customer CRM, agreements, cleaning, maintenance, and recovery systems.

## v0.9.4 — Coverage conversation & guided rental flow
- Customers now explicitly tell the rental agent which protection/coverage options they want.
- Customer requests include LDW only, LDW + roadside, full protection, roadside only, or declining all optional coverage.
- One button applies exactly what the customer requested; the full product screen remains available for changes.
- Selecting a vehicle now immediately explains the next step and provides a prominent Continue to Rental Agreement button.
- The rental agreement cannot proceed until the customer's coverage decision is confirmed.
- After payment authorization and signature, the game explicitly directs the manager to Start Vehicle Walk-Around.
- The intended transaction flow is now: customer coverage choice → exact vehicle → agreement → payment authorization → signature → walk-around → release vehicle.

## v0.9.4 — Automatic checkout flow fix
- Selecting a vehicle now immediately starts checkout.
- The renter first tells you exactly which coverage/protection they want.
- Applying the customer's requested coverage automatically opens the rental agreement.
- Declining coverage also automatically advances to the rental agreement.
- Reviewing/changing protection products now continues into the agreement after saving.
- The selected-vehicle confirmation button now starts the same guided checkout flow instead of bypassing it.
- The selected vehicle bar shows the full flow: coverage → agreement → payment → signature → walk-around.
- Fixed the older protection-conversation handler that could override the new customer coverage request.
- Added save migration support for v0.7.0, v0.8.0, v0.9.0 and v0.9.1.

## v0.9.4 — Checkout controller rebuild
- Rebuilt the vehicle-selection checkout handoff instead of layering another patch on the old protection system.
- Selecting a vehicle now resets that rental's checkout stage and immediately generates the renter's coverage preference.
- The renter's exact requested coverage is displayed in her speech bubble and in a dedicated checkout modal.
- A persistent checkout card also appears in the customer/rental panel, so the next action cannot disappear.
- Accept Coverage & Open Rental Agreement now applies the requested products and opens the agreement directly.
- Discuss Protection now begins with the customer's stated preference instead of generic product checkboxes.
- Changing coverage or declining all also opens the agreement automatically when a vehicle is already selected.
- Added migration for v0.9.2 saves.

## v0.9.4 — Core button/Manager Office stability repair
- Restored the missing renderKpis() function that was crashing every full UI refresh.
- Because that crash happened after clicks, it made many unrelated buttons appear broken and prevented secondary screens such as Manager Office from rendering.
- The main render loop is now fail-soft: a problem in one panel no longer stops the rest of the game from updating.
- Navigation now refreshes secondary screens when opened.
- The facility Manager Office button now opens the real Manager Office screen instead of a generic informational popup.
- Added a visible Office Is Live status card.
- Updated save migration to include v0.9.3.
