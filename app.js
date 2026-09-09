
const SAVE_KEY="horizonRentalManager_v040";
const CLASSES=["Economy","Midsize","Full Size","SUV","Premium SUV","Minivan","Pickup"];
const MODELS=[
["Chevrolet Equinox","SUV"],["Nissan Rogue","SUV"],["Ford Explorer","Premium SUV"],["Toyota Highlander","SUV"],
["Jeep Grand Cherokee","SUV"],["Toyota Camry","Full Size"],["Chevrolet Malibu","Midsize"],["Kia K5","Midsize"],
["Hyundai Elantra","Economy"],["Toyota Corolla","Economy"],["Chrysler Pacifica","Minivan"],["Ford Maverick","Pickup"]
];
const FIRST=["Jennifer","Mark","Sarah","Brian","Lisa","Daniel","Emily","Michael","Amanda","Chris","Nicole","Kevin","Rachel","Jason"];
const LAST=["Collins","Reynolds","Mitchell","Torres","Carter","Price","Miller","Davis","Anderson","Clark","Taylor","Jackson","Moore"];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const pick=a=>a[Math.floor(Math.random()*a.length)];
const money=n=>n.toLocaleString(undefined,{style:"currency",currency:"USD",maximumFractionDigits:0});
const uid=()=>crypto.randomUUID();
function fmtTime(m){let h=Math.floor(m/60)%24,mm=m%60,ap=h>=12?"PM":"AM";return `${h%12||12}:${String(mm).padStart(2,"0")} ${ap}`}
function initials(name){return name.split(" ").map(x=>x[0]).join("").slice(0,2)}
function makeCustomer(i=0){
 const name=i===0?"Jennifer Collins":`${pick(FIRST)} ${pick(LAST)}`;
 return{id:uid(),name,phone:`(574) 555-${Math.floor(1000+Math.random()*8999)}`,email:name.toLowerCase().replace(" ",".")+"@email.com",
 loyalty:i===0?"Gold":Math.random()<.18?"Gold":Math.random()<.22?"Silver":"None",type:Math.random()<.28?"Business":"Leisure",
 note:Math.random()<.25?pick(["Needs child seat","Prefers SUV","Debit card","Insurance replacement","Frequent renter"]):""}
}
function makeVehicle(i){
 const [model,cls]=MODELS[i%MODELS.length]; let unit=2400+i*37;
 const statuses=i<13?"Ready":i<17?"Rented":i<19?"Returned":i<23?"Cleaning":i<24?"Fueling":i<26?"Maintenance":"Ready";
 return{id:uid(),unit,model,class:cls,year:2026-(i%2),miles:Math.floor(4200+Math.random()*42000),fuel:Math.floor(5+Math.random()*4),
 clean:Math.floor(75+Math.random()*26),status:statuses,history:[{date:"Sep 8, 2026",text:"Active fleet unit at Warsaw Branch."}],
 damage:[],cleanRemaining:statuses==="Cleaning"?Math.floor(8+Math.random()*42):0,assignedRental:null,revenue:Math.floor(3000+Math.random()*12000)}
}
function makeReservation(i){
 let c=makeCustomer(i), pickup=540+i*15;
 return{id:uid(),customer:c,pickup,class:i===0?"SUV":pick(CLASSES),days:i===0?3:1+Math.floor(Math.random()*4),
 rate:i===0?69.99:49+Math.floor(Math.random()*80),status:i<1?"Waiting":"Booked",assignedVehicle:null,arrived:i===0?532:null,
 products:{damage:false,liability:false,roadside:false,fuel:false,driver:false,seat:false},conversation:0}
}
function newState(){
 let fleet=Array.from({length:28},(_,i)=>makeVehicle(i));
 return{
  version:"0.4.0",date:new Date(2026,8,8),minute:554,running:false,weather:"72°F Clear",
  fleet,reservations:Array.from({length:15},(_,i)=>makeReservation(i)),selectedReservation:null,
  cleaningBays:[null,null,null,null,null,null],cleaningQueue:[],events:[],contracts:[],returnsToday:7,rentalsToday:18,
  satisfaction:92,revenueToday:4820,laborToday:1140,branchStatus:"Running Smoothly",managerInbox:[],
  employees:[
   {name:"Megan Harper",role:"Assistant Manager",status:"Working",task:"Counter",sales:82,service:91},
   {name:"Jasmine Reed",role:"Rental Agent",status:"Working",task:"Counter",sales:90,service:95},
   {name:"Tyler Brooks",role:"Detailer",status:"Working",task:"Cleaning Bay",sales:20,service:82},
   {name:"Carlos Vega",role:"Service Agent",status:"Working",task:"Returns",sales:45,service:88},
   {name:"Hannah Cole",role:"Rental Agent",status:"Working",task:"Counter",sales:71,service:80},
   {name:"Derek Sims",role:"Driver",status:"Working",task:"Fueling/Transfers",sales:20,service:83}
  ]
 }
}
let state=newState(),timer=null,vehicleFilter="available";
function waiting(){return state.reservations.filter(r=>r.status==="Waiting").sort((a,b)=>(a.arrived||a.pickup)-(b.arrived||b.pickup))}
function ready(){return state.fleet.filter(v=>v.status==="Ready")}
function selected(){return state.reservations.find(r=>r.id===state.selectedReservation)||waiting()[0]||state.reservations.find(r=>r.status==="Booked")}
function utilization(){return Math.round(state.fleet.filter(v=>v.status==="Rented").length/state.fleet.length*100)}
function addHistory(v,text){v.history.unshift({date:state.date.toLocaleDateString(),text})}
function initCleaning(){
 let cleaners=state.fleet.filter(v=>v.status==="Cleaning");
 cleaners.slice(0,6).forEach((v,i)=>state.cleaningBays[i]=v.id);
 state.cleaningQueue=cleaners.slice(6).map(v=>v.id)
}
initCleaning();
state.selectedReservation=waiting()[0]?.id||state.reservations[0].id;

function render(){
 $("#topDate").textContent=state.date.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"});
 $("#topTime").textContent=fmtTime(state.minute);$("#weatherText").textContent=state.weather;
 $("#playBtn").textContent=state.running?"⏸ Pause":"▶ Run";
 renderQueue();renderCustomer();renderAssign();renderFacility();renderKpis();renderOtherScreens()
}
function renderQueue(){
 const w=waiting();$("#queueCount").textContent=`(${w.length})`;$("#estWait").textContent=`${Math.max(0,w.length*3-1)} min`;
 $("#customerQueue").innerHTML=w.length?w.map((r,i)=>`<div class="queue-item ${r.id===selected()?.id?"selected":""}" onclick="selectReservation('${r.id}')">
 <div class="queue-num">${i+1}</div><div class="face">${initials(r.customer.name)}</div><div><div class="q-name">${r.customer.name}</div><div class="q-meta">${r.status==="Waiting"?"Reservation":"Walk-In"} • ${fmtTime(r.pickup)}<br>${r.class} • ${r.days} day${r.days>1?"s":""}</div></div><div class="q-wait">${Math.max(1,Math.floor((state.minute-(r.arrived||r.pickup))+2))} min</div></div>`).join(""):`<div class="queue-item"><div></div><div></div><div class="q-meta">No customers waiting.</div></div>`;
 let next=state.reservations.filter(r=>["Booked","Waiting"].includes(r.status)&&r.pickup<=state.minute+60).sort((a,b)=>a.pickup-b.pickup).slice(0,7);
 $("#arrivalsList").innerHTML=next.map(r=>`<div class="arrival"><span>${fmtTime(r.pickup)}</span><span>${r.customer.name}</span><span>${r.class}</span></div>`).join("")
}
function renderCustomer(){
 const r=selected();if(!r)return;
 $("#customerAvatar").textContent=initials(r.customer.name);
 const scripts=[
  `Hi, I have a reservation for a ${r.class.toLowerCase()} under ${r.customer.name}.`,
  "Yes, that's correct. What vehicles do you have available?",
  "I'd like to keep the pickup quick if possible.",
  "That vehicle works for me."
 ];
 $("#speechBubble").textContent=scripts[Math.min(r.conversation||0,scripts.length-1)];
 $("#rentalInfo").innerHTML=`<div class="customer-title"><div class="face">${initials(r.customer.name)}</div><div><h3>${r.customer.name}</h3><div class="info-grid">
 <div><b>Phone:</b> ${r.customer.phone}</div><div><b>Reservation:</b> ${r.id.slice(0,8).toUpperCase()}</div>
 <div><b>Email:</b> ${r.customer.email}</div><div><b>Pickup:</b> ${fmtTime(r.pickup)}</div>
 <div><b>Loyalty:</b> ${r.customer.loyalty}</div><div><b>Duration:</b> ${r.days} days</div>
 <div><b>Type:</b> ${r.customer.type}</div><div><b>Vehicle Class:</b> ${r.class}</div>
 <div><b>Rate:</b> $${r.rate.toFixed(2)}/day</div><div><b>Status:</b> ${r.status}</div></div></div></div>`;
 const btns=[
 ["Confirm reservation",()=>advanceConversation(r.id)],
 ["Offer an upgrade",()=>{vehicleFilter="upgrades";renderAssign();advanceConversation(r.id)}],
 ["Discuss protection",()=>{$("#productDamage").focus();advanceConversation(r.id)}],
 ["Check ID / Payment",()=>showModal("ID & Payment",`${r.customer.name}'s license and payment authorization verified. Deposit hold: $200.`)],
 ["Modify reservation",()=>showModal("Modify Reservation","Modify dates, class, return location, or rate plan from this desk screen.")],
 ["Other options",()=>showModal("Other Options","Add additional driver, child seat, roadside coverage, fuel plan, notes, or manager override.")],
 ];
 $("#conversationButtons").innerHTML=btns.map((b,i)=>`<button onclick="counterAction(${i})">${b[0]}</button>`).join("");
 window._counterFns=btns.map(b=>b[1]);
 ["damage","liability","roadside","fuel","driver","seat"].forEach(k=>{
   let el=$("#product"+k[0].toUpperCase()+k.slice(1)); if(el)el.checked=!!r.products[k]
 });
}
window.counterAction=i=>window._counterFns[i]();
window.advanceConversation=id=>{let r=state.reservations.find(x=>x.id===id);r.conversation=(r.conversation||0)+1;renderCustomer()}
window.selectReservation=id=>{state.selectedReservation=id;render()}
function renderAssign(){
 const r=selected();if(!r)return;
 let vehicles=state.fleet;
 if(vehicleFilter==="available")vehicles=vehicles.filter(v=>v.status==="Ready"&&v.class===r.class);
 if(vehicleFilter==="upgrades")vehicles=vehicles.filter(v=>v.status==="Ready"&&v.class!==r.class);
 if(vehicleFilter==="all")vehicles=vehicles.filter(v=>v.status==="Ready");
 if(vehicleFilter==="available"&&!vehicles.length)vehicles=state.fleet.filter(v=>v.status==="Ready");
 $("#availableCount").textContent=`(${state.fleet.filter(v=>v.status==="Ready").length})`;
 $("#assignVehicles").innerHTML=vehicles.slice(0,10).map((v,i)=>`<div class="vehicle-option ${i===0?"best":""}">
 <div class="car-thumb"><div class="car-shape"></div><div class="wheel a"></div><div class="wheel b"></div></div>
 <div><div class="v-name">${v.class} - ${v.model}</div><div class="v-meta">Unit ${v.unit}<br>${v.miles.toLocaleString()} mi | ${v.fuel}/8 | ${v.clean>=90?"Clean":"Needs touch-up"}</div></div>
 <button class="assign-btn" onclick="assignVehicle('${v.id}')">Assign</button></div>`).join("")||`<div class="vehicle-option"><div></div><div class="v-meta">No matching ready vehicles. Check upgrades or full inventory.</div></div>`;
}
$$(".mini-tab").forEach(b=>b.onclick=()=>{$$(".mini-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");vehicleFilter=b.dataset.filter;renderAssign()});
function gatherProducts(r){
 r.products.damage=$("#productDamage").checked;r.products.liability=$("#productLiability").checked;r.products.roadside=$("#productRoadside").checked;
 r.products.fuel=$("#productFuel").checked;r.products.driver=$("#productDriver").checked;r.products.seat=$("#productSeat").checked
}
window.assignVehicle=id=>{
 const r=selected(),v=state.fleet.find(x=>x.id===id);if(!r||!v)return;
 gatherProducts(r);r.assignedVehicle=v.id;r.status="Out";v.status="Rented";v.assignedRental=r.id;
 let extras=(r.products.damage?24.99:0)+(r.products.liability?14.99:0)+(r.products.roadside?6.99:0)+(r.products.driver?7:0)+(r.products.seat?13:0)+(r.products.fuel?64.99/r.days:0);
 let daily=r.rate+extras;state.revenueToday+=daily;state.rentalsToday++;
 let contract={id:uid(),number:`RA-${260900+state.contracts.length+1}`,customer:r.customer.name,vehicle:v.unit,checkout:fmtTime(state.minute),days:r.days,daily,products:{...r.products},status:"Open"};
 state.contracts.unshift(contract);addHistory(v,`Assigned to ${r.customer.name} on ${contract.number}; checkout ${v.miles.toLocaleString()} miles, ${v.fuel}/8 fuel.`);
 state.selectedReservation=waiting()[0]?.id||state.reservations.find(x=>x.status==="Booked")?.id||null;
 showModal("Rental Complete",`${r.customer.name} is leaving in Unit ${v.unit}, a ${v.model}. Agreement ${contract.number}. Daily total: ${money(daily)}.`);
 render()
}
function renderFacility(){
 $("#readyCount").textContent=`(${state.fleet.filter(v=>v.status==="Ready").length})`;
 $("#returnCount").textContent=`(${state.fleet.filter(v=>v.status==="Returned").length})`;
 $("#cleanCount").textContent=`(${state.fleet.filter(v=>v.status==="Cleaning").length})`;
 $("#fuelCount").textContent=`(${state.fleet.filter(v=>v.status==="Fueling").length})`;
 $("#maintCount").textContent=`(${state.fleet.filter(v=>v.status==="Maintenance").length})`;
 $("#readyRow").innerHTML=state.fleet.filter(v=>v.status==="Ready").slice(0,20).map(v=>lotCar(v)).join("");
 $("#returnLane").innerHTML=state.fleet.filter(v=>v.status==="Returned").map(v=>lotCar(v,true)).join("");
 $("#fuelZone").innerHTML=state.fleet.filter(v=>v.status==="Fueling").map(v=>lotCar(v,true)).join("");
 $("#maintenanceZone").innerHTML=state.fleet.filter(v=>v.status==="Maintenance").map(v=>lotCar(v,true)).join("");
 $("#cleaningBays").innerHTML=state.cleaningBays.map((id,i)=>{let v=state.fleet.find(x=>x.id===id);return `<div class="clean-bay"><strong>Bay ${i+1}</strong>${v?`Unit ${v.unit}<br>${v.model}<div class="timer">${Math.max(0,v.cleanRemaining)} min</div>`:"Available"}</div>`}).join("");
 $("#cleaningQueue").innerHTML=state.cleaningQueue.map(id=>{let v=state.fleet.find(x=>x.id===id);return `<span class="queue-chip">Queued: ${v?.unit||"?"}</span>`}).join("")
}
function lotCar(v,tall=false){return `<div class="lot-car" onclick="vehicleDetails('${v.id}')"><span>${v.unit}</span></div>`}
window.vehicleDetails=id=>{let v=state.fleet.find(x=>x.id===id);showModal(`Unit ${v.unit} — ${v.model}`,`<b>Status:</b> ${v.status}<br><b>Class:</b> ${v.class}<br><b>Mileage:</b> ${v.miles.toLocaleString()}<br><b>Fuel:</b> ${v.fuel}/8<br><b>Cleanliness:</b> ${v.clean}%<br><br><b>History</b><br>${v.history.map(h=>`${h.date}: ${h.text}`).join("<br>")}`)}
function renderKpis(){
 const u=utilization();$("#carsOnLot").textContent=state.fleet.filter(v=>v.status!=="Rented").length;$("#lotBreakdown").textContent=`${ready().length} Ready • ${state.fleet.filter(v=>v.status==="Cleaning").length} Cleaning • ${state.fleet.filter(v=>v.status==="Maintenance").length} Maintenance`;
 $("#todaysRentals").textContent=state.rentalsToday;$("#rentalsBreakdown").textContent=`${state.contracts.filter(c=>c.status==="Open").length} currently out`;
 $("#returnsToday").textContent=state.returnsToday;$("#returnsBreakdown").textContent=`${state.fleet.filter(v=>v.status==="Returned").length} in return lane`;
 $("#utilKpi").textContent=u+"%";$("#utilBar").style.width=Math.min(100,u)+"%";$("#satKpi").textContent=state.satisfaction+"%";$("#satBar").style.width=state.satisfaction+"%";
 $("#revenueKpi").textContent=money(state.revenueToday);$("#laborKpi").textContent=`Labor ${money(state.laborToday)}`;$("#branchStatus").textContent=`● ${state.branchStatus}`;
 let problems=waiting().length>4||state.fleet.filter(v=>v.status==="Cleaning").length>6||ready().length<5;
 $("#branchMessage").textContent=problems?"Operational pressure building — review queue and vehicle readiness.":"Keep up the good work!"
}
function tick(mins=5){
 state.minute+=mins;
 if(state.minute>=1140){state.minute=1140;state.running=false;if(timer){clearInterval(timer);timer=null}}
 // reservation arrivals
 state.reservations.forEach(r=>{if(r.status==="Booked"&&r.pickup<=state.minute){r.status="Waiting";r.arrived=state.minute}});
 // clean bays progress
 state.cleaningBays.forEach((id,i)=>{if(!id)return;let v=state.fleet.find(x=>x.id===id);v.cleanRemaining=Math.max(0,v.cleanRemaining-mins);if(v.cleanRemaining===0){v.clean=100;v.status=v.fuel<6?"Fueling":"Ready";addHistory(v,`Cleaning completed in Bay ${i+1}.`);state.cleaningBays[i]=null}});
 fillCleaningBays();
 // fueling progress random
 if(state.minute%20<mins){let f=state.fleet.find(v=>v.status==="Fueling");if(f){f.fuel=8;f.status="Ready";addHistory(f,"Fueling completed; moved to Ready Row.")}}
 // random return
 if(state.minute%45<mins&&Math.random()<.6){let r=state.reservations.find(x=>x.status==="Out");if(r){let v=state.fleet.find(x=>x.id===r.assignedVehicle);if(v){r.status="Returned";v.status="Returned";v.miles+=Math.floor(50+Math.random()*260);v.fuel=Math.max(1,Math.floor(2+Math.random()*6));v.clean=Math.floor(45+Math.random()*40);state.returnsToday++;addHistory(v,`Returned from ${r.customer.name}: ${v.miles.toLocaleString()} miles, ${v.fuel}/8 fuel.`)}}}
 // auto inspect a returned car every 20 min
 if(state.minute%20<mins){let v=state.fleet.find(x=>x.status==="Returned");if(v){v.status="Cleaning";v.cleanRemaining=Math.floor(12+Math.random()*35);if(!state.cleaningQueue.includes(v.id)&&!state.cleaningBays.includes(v.id))state.cleaningQueue.push(v.id);addHistory(v,"Return inspection complete; queued for cleaning.");fillCleaningBays()}}
 render()
}
function fillCleaningBays(){
 for(let i=0;i<state.cleaningBays.length;i++){if(!state.cleaningBays[i]&&state.cleaningQueue.length){state.cleaningBays[i]=state.cleaningQueue.shift()}}
}
function nextDay(){
 state.date.setDate(state.date.getDate()+1);state.minute=420;state.revenueToday=0;state.laborToday=0;state.rentalsToday=0;state.returnsToday=0;state.weather=pick(["68°F Clear","61°F Cloudy","58°F Rain","72°F Sunny","64°F Windy"]);
 state.reservations=Array.from({length:15},(_,i)=>makeReservation(i));state.selectedReservation=state.reservations[0].id;
 state.cleaningBays=[null,null,null,null,null,null];state.cleaningQueue=[];
 state.fleet.forEach(v=>{if(v.status==="Rented")v.status="Returned";if(v.status==="Cleaning"){v.cleanRemaining=Math.floor(10+Math.random()*35);state.cleaningQueue.push(v.id)}});fillCleaningBays();render()
}
function renderOtherScreens(){
 $("#dashboardContent").innerHTML=`<h2>Branch Dashboard</h2><div class="card-grid"><div class="simple-card"><b>Fleet Utilization</b><h1>${utilization()}%</h1></div><div class="simple-card"><b>Customer Satisfaction</b><h1>${state.satisfaction}%</h1></div><div class="simple-card"><b>Ready Vehicles</b><h1>${ready().length}</h1></div><div class="simple-card"><b>Queue</b><h1>${waiting().length}</h1></div></div>`;
 $("#reservationContent").innerHTML=`<h2>Reservations</h2><table class="data-table"><thead><tr><th>Time</th><th>Customer</th><th>Class</th><th>Days</th><th>Status</th><th>Assigned</th></tr></thead><tbody>${state.reservations.map(r=>`<tr><td>${fmtTime(r.pickup)}</td><td>${r.customer.name}</td><td>${r.class}</td><td>${r.days}</td><td>${r.status}</td><td>${r.assignedVehicle?state.fleet.find(v=>v.id===r.assignedVehicle)?.unit:""}</td></tr>`).join("")}</tbody></table>`;
 $("#fleetContent").innerHTML=`<h2>Fleet</h2><table class="data-table"><thead><tr><th>Unit</th><th>Vehicle</th><th>Class</th><th>Miles</th><th>Fuel</th><th>Status</th></tr></thead><tbody>${state.fleet.map(v=>`<tr onclick="vehicleDetails('${v.id}')"><td>${v.unit}</td><td>${v.model}</td><td>${v.class}</td><td>${v.miles.toLocaleString()}</td><td>${v.fuel}/8</td><td>${v.status}</td></tr>`).join("")}</tbody></table>`;
 $("#employeeContent").innerHTML=`<h2>Employees</h2><div class="card-grid">${state.employees.map(e=>`<div class="simple-card"><h3>${e.name}</h3><b>${e.role}</b><p>${e.status} • ${e.task}</p><p>Sales ${e.sales}% • Service ${e.service}%</p></div>`).join("")}</div>`;
 $("#maintenanceContent").innerHTML=`<h2>Maintenance & Turnaround</h2><div class="card-grid"><div class="simple-card"><b>Cleaning</b><h1>${state.fleet.filter(v=>v.status==="Cleaning").length}</h1></div><div class="simple-card"><b>Fueling</b><h1>${state.fleet.filter(v=>v.status==="Fueling").length}</h1></div><div class="simple-card"><b>Maintenance</b><h1>${state.fleet.filter(v=>v.status==="Maintenance").length}</h1></div><div class="simple-card"><b>Return Lane</b><h1>${state.fleet.filter(v=>v.status==="Returned").length}</h1></div></div>`;
 $("#reportsContent").innerHTML=`<h2>Reports</h2><div class="card-grid"><div class="simple-card"><b>Revenue Today</b><h1>${money(state.revenueToday)}</h1></div><div class="simple-card"><b>Labor Today</b><h1>${money(state.laborToday)}</h1></div><div class="simple-card"><b>Rental Agreements</b><h1>${state.contracts.length}</h1></div><div class="simple-card"><b>Satisfaction</b><h1>${state.satisfaction}%</h1></div></div>`;
 $("#corporateContent").innerHTML=`<h2>Corporate Scorecard</h2><div class="card-grid"><div class="simple-card"><b>Utilization Target</b><h1>78%</h1><p>Current ${utilization()}%</p></div><div class="simple-card"><b>Customer Satisfaction</b><h1>90%</h1><p>Current ${state.satisfaction}%</p></div><div class="simple-card"><b>Branch Status</b><h1>${state.branchStatus}</h1></div></div>`;
}
function showModal(title,body){$("#modalBody").innerHTML=`<h2>${title}</h2><div>${body}</div>`;$("#modal").showModal()}
$$(".nav-btn").forEach(b=>b.onclick=()=>{$$(".nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".screen").forEach(s=>s.classList.remove("active"));$("#screen-"+b.dataset.screen).classList.add("active")});
$$(".facility-tab").forEach(b=>b.onclick=()=>{$$(".facility-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");let zone=b.dataset.zone;if(zone==="cleaning")showModal("Cleaning Bay",`${state.fleet.filter(v=>v.status==="Cleaning").length} vehicles are currently in cleaning. Cars wait in queue until one of six numbered bays is available.`);if(zone==="office")showModal("Manager Office","Phone calls, inbox items, employee issues, reports, and escalations are handled here.")});
$("#playBtn").onclick=()=>{state.running=!state.running;if(state.running&&!timer)timer=setInterval(()=>tick(5),900);else if(!state.running&&timer){clearInterval(timer);timer=null}render()};
$("#advance15Btn").onclick=()=>tick(15);$("#nextDayBtn").onclick=nextDay;
$("#saveBtn").onclick=()=>{localStorage.setItem(SAVE_KEY,JSON.stringify({...state,date:state.date.toISOString()}));showModal("Game Saved","Your branch was saved in this browser.")};
$("#loadBtn").onclick=()=>{let raw=localStorage.getItem(SAVE_KEY);if(!raw)return showModal("Load Game","No v0.4.0 save was found.");state=JSON.parse(raw);state.date=new Date(state.date);state.running=false;if(timer){clearInterval(timer);timer=null}render();showModal("Game Loaded","Your branch save has been restored.")};
$("#viewInventoryBtn").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="fleet").click()};
$("#officePhone").onclick=()=>showModal("Manager Phone",state.managerInbox.length?state.managerInbox.map(x=>`<p>${x}</p>`).join(""):"No calls waiting right now.");
$("#officeInbox").onclick=()=>showModal("Manager Inbox","Regional utilization target is 78%. Keep ready-car availability high during peak arrivals.");
$("#officeStaff").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="employees").click()};
$("#officeReports").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="reports").click()};
$("#editCustomerBtn").onclick=()=>showModal("Edit Rental","Customer profile and reservation modification controls will live here.");
["damage","liability","roadside","fuel","driver","seat"].forEach(k=>{let el=$("#product"+k[0].toUpperCase()+k.slice(1));el.onchange=()=>{let r=selected();if(r)gatherProducts(r)}})
window.addEventListener("keydown",e=>{if(e.code==="Space"&&!["INPUT","BUTTON"].includes(document.activeElement.tagName)){e.preventDefault();$("#playBtn").click()}if(e.key.toLowerCase()==="d")tick(15)});
render();
