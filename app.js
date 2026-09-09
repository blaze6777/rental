
const SAVE_KEY="horizonRentalManager_v0100";
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
 damage:[],condition:{front:[],rear:[],driver:[],passenger:[],glass:[],wheels:[],roof:[],interior:[]},cleanRemaining:statuses==="Cleaning"?Math.floor(8+Math.random()*42):0,assignedRental:null,revenue:Math.floor(3000+Math.random()*12000)}
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
  version:"0.10.0",date:new Date(2026,8,8),minute:554,running:false,weather:"72°F Clear",
  fleet,reservations:Array.from({length:15},(_,i)=>makeReservation(i)),selectedReservation:null,selectedVehicle:null,pendingWalkaround:null,simSpeed:"slow",
  cleaningBays:[null,null,null,null,null,null],cleaningQueue:[],events:[],contracts:[],returnsToday:7,rentalsToday:18,
  phoneQueue:[],overdue:[],dnr:[],accounts:[
   {name:"Lake City Collision",type:"Body Shop",relationship:82,rentals:7},
   {name:"Zimmer Ortho Travel",type:"Corporate",relationship:90,rentals:12},
   {name:"Northern Indiana Insurance",type:"Insurance",relationship:76,rentals:9}
  ],
  branches:[
   {name:"Warsaw",distance:0,suv:4,minivan:1,economy:5},
   {name:"Fort Wayne Airport",distance:44,suv:9,minivan:4,economy:12},
   {name:"Columbia City",distance:24,suv:3,minivan:2,economy:4},
   {name:"Goshen",distance:31,suv:6,minivan:1,economy:7}
  ],
  keys:{},morningShown:false,areaManager:{lastVisit:null,nextVisitDay:4},
  career:{title:"Branch Manager",xp:24,level:1,next:"Airport Branch Manager"},
  dailyHistory:[],autoSaves:[],transfers:[],oneWays:[],damageClaims:[],
  expensesToday:{labor:0,fuel:0,maintenance:0,transfers:0,cleaning:0,adjustments:0},
  staffAssignments:{},plannerNotes:[],
  fleetPurchases:[],fleetSales:[],
  customerProfiles:[],paymentEvents:[],billingDisputes:[],employeeReviews:[],
  internalJobs:[{id:"FW-AIR-BM",title:"Fort Wayne Airport Branch Manager",fleet:186,employees:24,annualRevenue:8400000,status:"Locked"}],
  branchYears:0,
  parkingSpaces:[],managerVisitors:[],roadsideCases:[],rareEvents:[],fleetDeliveries:[],
  branchRelationships:{},areaMode:false,managedBranches:[],
  customerReviews:[],serviceRecoveries:[],satisfactionMetrics:{exactClass:0,totalAssignments:0,complaints:0,totalWait:0,waitCount:0},
  satisfaction:92,revenueToday:4820,laborToday:1140,branchStatus:"Running Smoothly",managerInbox:[],
  employees:[
   {name:"Megan Harper",role:"Assistant Manager",status:"Working",task:"Counter",sales:82,service:91,years:4,pay:24.5,attendance:96,history:["Promoted to Assistant Manager"],auto:true},
   {name:"Jasmine Reed",role:"Rental Agent",status:"Working",task:"Counter",sales:90,service:95,years:3,pay:20.75,attendance:98,history:["Customer compliment"],auto:true},
   {name:"Tyler Brooks",role:"Detailer",status:"Working",task:"Cleaning Bay",sales:20,service:82,years:2,pay:18.25,attendance:89,history:["Attendance coaching"],auto:true},
   {name:"Carlos Vega",role:"Service Agent",status:"Working",task:"Returns",sales:45,service:88,years:5,pay:21.5,attendance:97,history:["Damage inspection training"],auto:true},
   {name:"Hannah Cole",role:"Rental Agent",status:"Working",task:"Counter",sales:71,service:80,years:1,pay:19.25,attendance:94,history:["New hire"],auto:true},
   {name:"Derek Sims",role:"Driver",status:"Working",task:"Fueling/Transfers",sales:20,service:83,years:6,pay:19.75,attendance:99,history:["Safe driving award"],auto:true}
  ]
 }
}
let state=newState(),timer=null,timerToken=0,nextTickAt=0,timerCountdown=null,vehicleFilter="available";
state.fleet.forEach(v=>{if(!v.keyLocation)v.keyLocation=v.status==="Rented"?"Customer":v.status==="Maintenance"?"Maintenance":"Key Cabinet";v.nextService=v.miles+Math.floor(800+Math.random()*3500);v.registration="2027-06";v.recall=Math.random()<.08?"Open recall":"Clear"});

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
setTimeout(()=>{if(!state.phoneQueue.length){addPhone("Body Shop Referral","Lake City Collision has a customer arriving after a collision and needs an insurance replacement vehicle.",[{label:"Accept referral",fn:"accept"},{label:"Decline",fn:"deny"}]);render()}},1200);


function migrateState(s){
 const fresh=newState();
 // Preserve user's existing game while supplying every field newer versions need.
 s={...fresh,...s};
 s.date=s.date instanceof Date?s.date:new Date(s.date||fresh.date);
 s.phoneQueue=Array.isArray(s.phoneQueue)?s.phoneQueue:[];
 s.overdue=Array.isArray(s.overdue)?s.overdue:[];
 s.dnr=Array.isArray(s.dnr)?s.dnr:[];
 s.accounts=Array.isArray(s.accounts)&&s.accounts.length?s.accounts:fresh.accounts;
 s.branches=Array.isArray(s.branches)&&s.branches.length?s.branches:fresh.branches;
 s.managerInbox=Array.isArray(s.managerInbox)?s.managerInbox:[];
 s.contracts=Array.isArray(s.contracts)?s.contracts:[];
 s.cleaningQueue=Array.isArray(s.cleaningQueue)?s.cleaningQueue:[];
 s.cleaningBays=Array.isArray(s.cleaningBays)?s.cleaningBays:[null,null,null,null,null,null];
 s.career=s.career||fresh.career;
 s.areaManager=s.areaManager||fresh.areaManager;
 s.dailyHistory=Array.isArray(s.dailyHistory)?s.dailyHistory:[];
 s.autoSaves=Array.isArray(s.autoSaves)?s.autoSaves:[];
 s.transfers=Array.isArray(s.transfers)?s.transfers:[];
 s.oneWays=Array.isArray(s.oneWays)?s.oneWays:[];
 s.damageClaims=Array.isArray(s.damageClaims)?s.damageClaims:[];
 s.expensesToday={labor:0,fuel:0,maintenance:0,transfers:0,cleaning:0,adjustments:0,...(s.expensesToday||{})};
 s.staffAssignments=s.staffAssignments||{};
 s.plannerNotes=Array.isArray(s.plannerNotes)?s.plannerNotes:[];
 s.fleetPurchases=Array.isArray(s.fleetPurchases)?s.fleetPurchases:[];
 s.fleetSales=Array.isArray(s.fleetSales)?s.fleetSales:[];
 s.customerProfiles=Array.isArray(s.customerProfiles)?s.customerProfiles:[];
 s.paymentEvents=Array.isArray(s.paymentEvents)?s.paymentEvents:[];
 s.billingDisputes=Array.isArray(s.billingDisputes)?s.billingDisputes:[];
 s.employeeReviews=Array.isArray(s.employeeReviews)?s.employeeReviews:[];
 s.internalJobs=Array.isArray(s.internalJobs)&&s.internalJobs.length?s.internalJobs:fresh.internalJobs;
 s.branchYears=Number(s.branchYears||0);
 s.parkingSpaces=Array.isArray(s.parkingSpaces)?s.parkingSpaces:[];
 s.managerVisitors=Array.isArray(s.managerVisitors)?s.managerVisitors:[];
 s.roadsideCases=Array.isArray(s.roadsideCases)?s.roadsideCases:[];
 s.rareEvents=Array.isArray(s.rareEvents)?s.rareEvents:[];
 s.fleetDeliveries=Array.isArray(s.fleetDeliveries)?s.fleetDeliveries:[];
 s.branchRelationships=s.branchRelationships||{};
 s.areaMode=!!s.areaMode;s.managedBranches=Array.isArray(s.managedBranches)?s.managedBranches:[];
 s.customerReviews=Array.isArray(s.customerReviews)?s.customerReviews:[];
 s.serviceRecoveries=Array.isArray(s.serviceRecoveries)?s.serviceRecoveries:[];
 s.satisfactionMetrics={exactClass:0,totalAssignments:0,complaints:0,totalWait:0,waitCount:0,...(s.satisfactionMetrics||{})};
 s.employees=(Array.isArray(s.employees)?s.employees:fresh.employees).map((e,i)=>({...fresh.employees[i%fresh.employees.length],...e,history:Array.isArray(e.history)?e.history:[]}));
 s.fleet=(Array.isArray(s.fleet)?s.fleet:fresh.fleet).map(v=>({
   condition:{front:[],rear:[],driver:[],passenger:[],glass:[],wheels:[],roof:[],interior:[]},
   damage:[],history:[],keyLocation:"Key Cabinet",recall:"Clear",...v,
   damage:Array.isArray(v.damage)?v.damage:[],
   history:Array.isArray(v.history)?v.history:[]
 }));
 s.reservations=Array.isArray(s.reservations)?s.reservations:fresh.reservations;
 if(!["slow","normal","fast"].includes(s.simSpeed))s.simSpeed="slow";
 s.version="0.10.0";
 return s
}
state=migrateState(state);

function safeRender(name,fn){
 try{fn()}
 catch(err){
   console.error(`Render failure in ${name}:`,err);
   const msg=$("#branchMessage");
   if(msg)msg.textContent=`Display issue repaired around ${name}; other controls remain available.`;
 }
}
function render(){
 try{
  $("#topDate").textContent=state.date.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"});
  $("#topTime").textContent=fmtTime(state.minute);
  $("#weatherText").textContent=state.weather;
  $("#playBtn").textContent=state.running?"⏸ Pause":"▶ Run";
  if($("#speedSelect"))$("#speedSelect").value=state.simSpeed||"slow";
  updateTimerStatus();
 }catch(err){console.error("Header render error:",err)}
 safeRender("customer queue",renderQueue);
 safeRender("customer",renderCustomer);
 safeRender("vehicle assignment",renderAssign);
 safeRender("facility",renderFacility);
 safeRender("KPIs",renderKpis);
 safeRender("secondary screens",renderOtherScreens);
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
 
 if(r.checkoutStage==="coverage" && r.customerCoverageRequest){
   $("#speechBubble").textContent=r.customerCoverageRequest.text;
 }else if(r.coverageConfirmed){
   $("#speechBubble").textContent=`That coverage works for me. Let's finish the agreement.`;
 }else{
   $("#speechBubble").textContent=scripts[Math.min(r.conversation||0,scripts.length-1)];
 }
 $("#rentalInfo").innerHTML=`<div class="customer-title"><div class="face">${initials(r.customer.name)}</div><div><h3>${r.customer.name}</h3><div class="info-grid">
 <div><b>Phone:</b> ${r.customer.phone}</div><div><b>Reservation:</b> ${r.id.slice(0,8).toUpperCase()}</div>
 <div><b>Email:</b> ${r.customer.email}</div><div><b>Pickup:</b> ${fmtTime(r.pickup)}</div>
 <div><b>Loyalty:</b> ${r.customer.loyalty}</div><div><b>Duration:</b> ${r.days} days</div>
 <div><b>Type:</b> ${r.customer.type}</div><div><b>Vehicle Class:</b> ${r.class}</div>
 <div><b>Rate:</b> $${r.rate.toFixed(2)}/day</div><div><b>Status:</b> ${r.status}</div></div><div class="promise-card"><b>Reservation Promise:</b> ${r.class}<br>${r.promise?.reason||"Trip"} • ${r.promise?.party||1} traveler(s) • ${r.promise?.luggage||1} luggage item(s)<br>${satisfactionSummary(r)}</div></div></div>`;
 const btns=[
 ["Confirm reservation",()=>confirmReservation(r.id)],
 ["Offer an upgrade",()=>offerUpgrade(r.id)],
 ["Discuss protection",()=>openProtection(r.id)],
 ["Check ID / Payment",()=>checkIdPayment(r.id)],
 ["Modify reservation",()=>modifyReservation(r.id)],
 ["Other options",()=>openOtherOptions(r.id)],
 ];
 $("#conversationButtons").innerHTML=btns.map((b,i)=>`<button onclick="counterAction(${i})">${b[0]}</button>`).join("");
 const existingGuide=$("#checkoutGuide");
 if(existingGuide)existingGuide.remove();
 if(state.selectedVehicle){
   const v=state.fleet.find(x=>x.id===state.selectedVehicle);
   if(v){
     const guide=document.createElement("div");
     guide.id="checkoutGuide";guide.className="checkout-next-panel";
     if(!r.coverageConfirmed){
       const req=customerCoverageRequest(r);
       guide.innerHTML=`<b>Customer coverage choice</b><div class="customer-quote">"${req.text}"</div><button class="primary" onclick="acceptCoverageAndOpenAgreement()">Accept Coverage & Open Rental Agreement →</button> <button onclick="openProtection(r.id)">Change Coverage</button>`;
     }else{
       guide.innerHTML=`<b>Vehicle selected: Unit ${v.unit} — ${v.model}</b><br>Coverage is confirmed.<br><br><button class="primary" onclick="openAgreementPreview()">Open Rental Agreement →</button>`;
     }
     $("#rentalInfo").appendChild(guide);
   }
 }
 window._counterFns=btns.map(b=>b[1]);
 ["damage","liability","roadside","fuel","driver","seat"].forEach(k=>{
   let el=$("#product"+k[0].toUpperCase()+k.slice(1)); if(el)el.checked=!!r.products[k]
 });
}
window.counterAction=i=>window._counterFns[i]();
window.advanceConversation=id=>{let r=state.reservations.find(x=>x.id===id);r.conversation=(r.conversation||0)+1;renderCustomer()}
window.selectReservation=id=>{if(state.pendingWalkaround)return openWalkaround();state.selectedReservation=id;state.selectedVehicle=null;vehicleFilter="available";render()}

window.confirmReservation=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 r.conversation=Math.max(r.conversation||0,1);
 showModal("Reservation Confirmed",`<p><b>${r.customer.name}</b></p><p>${r.class} • ${r.days} day(s) • ${money(r.rate)}/day</p><p>The reservation details are confirmed. Next, discuss protection or select a vehicle.</p>`);
 renderCustomer()
}
window.offerUpgrade=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 vehicleFilter="upgrades";
 $$(".mini-tab").forEach(x=>x.classList.toggle("active",x.dataset.filter==="upgrades"));
 r.conversation=Math.max(r.conversation||0,2);
 renderAssign();renderCustomer();
 showModal("Upgrade Options",`<p>${r.customer.name} reserved a <b>${r.class}</b>.</p><p>The vehicle list now shows available vehicles in other classes. Select one to offer an upgrade.</p>`)
}
window.openProtection=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 const p=r.products;
 $("#modalBody").innerHTML=`<h2>Protection & Optional Products</h2>
 <p>Review choices with ${r.customer.name}. Changes made here are saved to this rental.</p>
 <div class="protection-choice"><label><input type="checkbox" id="mDamage" ${p.damage?"checked":""}> Damage Waiver (LDW)</label><b>$24.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mLiability" ${p.liability?"checked":""}> Supplemental Liability</label><b>$14.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mRoadside" ${p.roadside?"checked":""}> Roadside Assistance</label><b>$6.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mFuel" ${p.fuel?"checked":""}> Prepaid Fuel</label><b>$64.99</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mDriver" ${p.driver?"checked":""}> Additional Driver</label><b>$7.00/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mSeat" ${p.seat?"checked":""}> Child Seat</label><b>$13.00/day</b></div>
 <div class="action-row" style="margin-top:12px"><button id="saveProtectionBtn">Save Choices</button><button id="declineProtectionBtn">Decline All Protection</button></div>`;
 $("#modal").showModal();
 setTimeout(()=>{
   $("#saveProtectionBtn").onclick=()=>{
     r.products.damage=$("#mDamage").checked;r.products.liability=$("#mLiability").checked;r.products.roadside=$("#mRoadside").checked;
     r.products.fuel=$("#mFuel").checked;r.products.driver=$("#mDriver").checked;r.products.seat=$("#mSeat").checked;
     r.conversation=Math.max(r.conversation||0,2);$("#modal").close();render()
   };
   $("#declineProtectionBtn").onclick=()=>{
     Object.keys(r.products).forEach(k=>r.products[k]=false);
     r.conversation=Math.max(r.conversation||0,2);$("#modal").close();render()
   }
 },0)
}
window.checkIdPayment=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 r.idVerified=true;r.paymentVerified=true;
 showModal("ID & Payment Verified",`<p><b>${r.customer.name}</b></p><p>✓ Driver's license verified</p><p>✓ Payment authorization approved</p><p>✓ $200 deposit hold authorized</p>`);
 render()
}
window.modifyReservation=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 $("#modalBody").innerHTML=`<h2>Modify Reservation</h2>
 <label>Vehicle Class<br><select id="modClass">${CLASSES.map(c=>`<option ${c===r.class?"selected":""}>${c}</option>`).join("")}</select></label><br><br>
 <label>Rental Days<br><input id="modDays" type="number" min="1" max="30" value="${r.days}"></label><br><br>
 <label>Daily Rate<br><input id="modRate" type="number" min="1" step=".01" value="${r.rate}"></label><br><br>
 <button id="saveModifyBtn">Save Changes</button>`;
 $("#modal").showModal();
 setTimeout(()=>{$("#saveModifyBtn").onclick=()=>{r.class=$("#modClass").value;r.days=+$("#modDays").value;r.rate=+$("#modRate").value;state.selectedVehicle=null;$("#modal").close();render()}},0)
}
window.openOtherOptions=id=>{
 const r=state.reservations.find(x=>x.id===id);if(!r)return;
 $("#modalBody").innerHTML=`<h2>Other Rental Options</h2><div class="action-modal-grid">
 <button onclick="quickOption('seat')"><b>Child Seat</b><br>Add/remove child seat</button>
 <button onclick="quickOption('driver')"><b>Additional Driver</b><br>Add/remove driver</button>
 <button onclick="quickOption('fuel')"><b>Prepaid Fuel</b><br>Add/remove fuel plan</button>
 <button onclick="quickOption('roadside')"><b>Roadside</b><br>Add/remove roadside</button>
 </div>`;
 $("#modal").showModal()
}
window.quickOption=k=>{let r=selected();if(!r)return;r.products[k]=!r.products[k];$("#modal").close();render()}

function renderAssign(){
 const r=selected();if(!r)return;
 let vehicles=state.fleet;
 if(vehicleFilter==="available")vehicles=vehicles.filter(v=>v.status==="Ready"&&v.class===r.class);
 if(vehicleFilter==="upgrades")vehicles=vehicles.filter(v=>v.status==="Ready"&&v.class!==r.class);
 if(vehicleFilter==="all")vehicles=vehicles.filter(v=>v.status==="Ready");
 if(vehicleFilter==="available"&&!vehicles.length)vehicles=state.fleet.filter(v=>v.status==="Ready");
 $("#availableCount").textContent=`(${state.fleet.filter(v=>v.status==="Ready").length})`;
 $("#assignVehicles").innerHTML=vehicles.slice(0,12).map((v,i)=>`<div class="vehicle-option ${state.selectedVehicle===v.id?"selected-vehicle":""}">
 <div class="car-thumb"><div class="car-shape"></div><div class="wheel a"></div><div class="wheel b"></div></div>
 <div><div class="v-name">${v.class} - ${v.model}</div><div class="v-meta">Unit ${v.unit}<br>${v.miles.toLocaleString()} mi | ${v.fuel}/8 | ${v.clean>=90?"Clean":"Needs touch-up"}</div></div>
 <button class="assign-btn" onclick="selectVehicle('${v.id}')">${state.selectedVehicle===v.id?"Selected":"Select"}</button></div>`).join("")||`<div class="vehicle-option"><div></div><div class="v-meta">No matching ready vehicles. Check upgrades or full inventory.</div></div>`;
 const sv=state.fleet.find(v=>v.id===state.selectedVehicle);
 const bar=$("#selectedVehicleBar"),confirm=$("#confirmAssignmentBtn");
 if(sv&&sv.status==="Ready"){
   bar.className="selected-vehicle-bar ready";bar.innerHTML=`<b>Selected: Unit ${sv.unit} — ${sv.model} (${sv.class})</b><br><span style="font-size:11px">Checkout flow: coverage → agreement → payment → signature → walk-around.</span>`;
   confirm.disabled=false
 }else{
   state.selectedVehicle=null;bar.className="selected-vehicle-bar";bar.textContent="No vehicle selected.";confirm.disabled=true
 }
}
$$(".mini-tab").forEach(b=>b.onclick=()=>{$$(".mini-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");vehicleFilter=b.dataset.filter;renderAssign()});
function gatherProducts(r){
 r.products.damage=$("#productDamage").checked;r.products.liability=$("#productLiability").checked;r.products.roadside=$("#productRoadside").checked;
 r.products.fuel=$("#productFuel").checked;r.products.driver=$("#productDriver").checked;r.products.seat=$("#productSeat").checked
}
window.selectVehicle=id=>{
 state.selectedVehicle=id;
 render();
 const r=selected(),v=state.fleet.find(x=>x.id===id);
 if(!r||!v)return;
 // Start the checkout flow automatically instead of leaving the player wondering what comes next.
 setTimeout(()=>beginCheckoutFlow(),50)
}
window.beginCheckoutFlow=()=>{
 const r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle);
 if(!r||!v)return showModal("Checkout","Select a customer and vehicle first.");
 if(!r.coverageConfirmed)return askCustomerCoverage();
 return openAgreementPreview()
}
window.assignVehicle=id=>{
 const r=selected(),v=state.fleet.find(x=>x.id===id);if(!r||!v)return;
 if(!r.agreementSigned){state.selectedVehicle=id;return openAgreementPreview()}
 if(v.status!=="Ready")return showModal("Vehicle Unavailable","That vehicle is no longer available. Please select another.");
 gatherProducts(r);
 if(!r.idVerified||!r.paymentVerified){
   return showModal("Complete ID & Payment First","Use the <b>Check ID / Payment</b> button before completing the rental.")
 }
 r.assignedVehicle=v.id;
 let cp=customerProfile(r.customer.id);
 if(cp?.preferences.includes("Avoids Nissan")&&/Nissan/i.test(v.model)){state.satisfaction=Math.max(0,state.satisfaction-2);cp.complaints.push("Assigned Nissan despite preference.")}
 if(cp?.preferences.includes("Prefers newer vehicles")&&v.year<2026){state.satisfaction=Math.max(0,state.satisfaction-1)}
 let extras=(r.products.damage?24.99:0)+(r.products.liability?14.99:0)+(r.products.roadside?6.99:0)+(r.products.driver?7:0)+(r.products.seat?13:0)+(r.products.fuel?64.99/r.days:0);
 let daily=r.rate+extras;state.revenueToday+=daily;state.rentalsToday++;
 let contract={id:uid(),number:`RA-${260900+state.contracts.length+1}`,customer:r.customer.name,customerId:r.customer.id,vehicle:v.unit,vehicleId:v.id,
 checkout:fmtTime(state.minute),days:r.days,daily,products:{...r.products},status:"Pending Walk-Around",walkaround:null};
 state.contracts.unshift(contract);
 startWalkaround(r,v,contract)
}

const WALK_AREAS=[
 ["front","Front / Bumper"],["rear","Rear / Bumper"],["driver","Driver Side"],["passenger","Passenger Side"],
 ["glass","Windshield / Glass"],["wheels","Wheels / Tires"],["roof","Roof"],["interior","Interior"]
];
function startWalkaround(r,v,contract){
 state.pendingWalkaround={
   reservationId:r.id,vehicleId:v.id,contractId:contract.id,
   checkoutMileage:v.miles,checkoutFuel:v.fuel,
   acknowledgedExisting:[],newDamage:[],startedAt:fmtTime(state.minute)
 };
 r.status="Walk-Around";
 v.status="Walk-Around";v.keyLocation="Manager/Customer";
 addHistory(v,`Rental agreement ${contract.number} created for ${r.customer.name}; vehicle moved to customer walk-around before release.`);
 render();
 openWalkaround()
}
function getOpenDamageForArea(v,area){
 return (v.damage||[]).filter(d=>d.status!=="Repaired"&&d.area===area)
}
window.openWalkaround=()=>{
 const p=state.pendingWalkaround;if(!p)return showModal("Walk-Around","No rental is currently waiting for a walk-around.");
 const r=state.reservations.find(x=>x.id===p.reservationId),v=state.fleet.find(x=>x.id===p.vehicleId),c=state.contracts.find(x=>x.id===p.contractId);
 const areaHtml=WALK_AREAS.map(([key,label])=>{
   const existing=getOpenDamageForArea(v,key);
   const newd=p.newDamage.filter(d=>d.area===key);
   let cls=newd.length?"newdamage":existing.length?"existing":"clear";
   let line=newd.length?`${newd.length} newly noted`:existing.length?`${existing.length} existing item(s)`:"No damage noted";
   return `<button class="wa-area ${cls}" onclick="walkaroundArea('${key}')"><strong>${label}</strong><span>${line}</span></button>`
 }).join("");
 const existingAll=(v.damage||[]).filter(d=>d.status!=="Repaired");
 $("#modalBody").innerHTML=`<h2>Customer Vehicle Walk-Around</h2>
 <div class="walkaround-shell">
 <div class="walkaround-car">
   <h3>Unit ${v.unit} — ${v.model}</h3>
   <div class="info-grid"><div><b>Customer:</b> ${r.customer.name}</div><div><b>Agreement:</b> ${c.number}</div>
   <div><b>Mileage Out:</b> ${p.checkoutMileage.toLocaleString()}</div><div><b>Fuel Out:</b> ${p.checkoutFuel}/8</div></div>
   <p>Walk around the vehicle with the customer. Click any area to document condition or confirm existing damage.</p>
   <div class="walkaround-diagram">${areaHtml}</div>
 </div>
 <div class="walkaround-summary">
   <h3>Condition Record</h3>
   <div><b>Existing damage:</b> ${existingAll.length}</div>
   <div><b>Newly documented before release:</b> ${p.newDamage.length}</div>
   <div class="damage-list">
     ${existingAll.length?existingAll.map(d=>`<span class="damage-chip existing">Existing: ${d.type} — ${WALK_AREAS.find(a=>a[0]===d.area)?.[1]||d.area}</span>`).join(""):"<span class='damage-chip'>No existing damage on file.</span>"}
     ${p.newDamage.map(d=>`<span class="damage-chip new">Newly documented: ${d.type} — ${WALK_AREAS.find(a=>a[0]===d.area)?.[1]||d.area}</span>`).join("")}
   </div>
   <div class="walkaround-actions">
     <button onclick="acknowledgeExisting()">Acknowledge Existing Damage</button>
     <button class="primary" onclick="completeWalkaround()">Complete Walk-Around & Release Vehicle</button>
     <button class="danger" onclick="cancelWalkaround()">Cancel Rental</button>
   </div>
 </div></div>`;
 $("#modal").showModal()
}
window.walkaroundArea=area=>{
 const p=state.pendingWalkaround;if(!p)return;
 const v=state.fleet.find(x=>x.id===p.vehicleId);
 const existing=getOpenDamageForArea(v,area);
 $("#modalBody").innerHTML=`<h2>${WALK_AREAS.find(a=>a[0]===area)?.[1]}</h2>
 <p>${existing.length?`There ${existing.length===1?"is":"are"} ${existing.length} existing damage item(s) already on this vehicle.`:"No existing damage is recorded in this area."}</p>
 ${existing.map(d=>`<div class="damage-chip existing">${d.type} — documented ${d.date||"previously"}</div>`).join("")}
 <h3>Document condition before customer leaves</h3>
 <div class="action-modal-grid">
 <button onclick="addWalkDamage('${area}','Scratch')"><b>Scratch</b><br>Paint/body scratch</button>
 <button onclick="addWalkDamage('${area}','Dent')"><b>Dent</b><br>Dent or ding</button>
 <button onclick="addWalkDamage('${area}','Chip/Crack')"><b>Chip / Crack</b><br>Glass, paint, or trim damage</button>
 <button onclick="addWalkDamage('${area}','Scuff')"><b>Scuff</b><br>Surface scuff or wheel rash</button>
 <button onclick="addWalkDamage('${area}','Stain')"><b>Stain / Interior Mark</b><br>Interior condition issue</button>
 <button onclick="openWalkaround()"><b>No New Damage</b><br>Return to walk-around</button>
 </div>`;
}
window.addWalkDamage=(area,type)=>{
 const p=state.pendingWalkaround;if(!p)return;
 const v=state.fleet.find(x=>x.id===p.vehicleId);
 const d={id:uid(),area,type,severity:"Pre-rental documented",date:state.date.toLocaleDateString(),status:"Existing",source:"Checkout walk-around"};
 v.damage.push(d);p.newDamage.push(d);
 addHistory(v,`CHECKOUT WALK-AROUND: ${type} documented at ${area} before customer release.`);
 openWalkaround()
}
window.acknowledgeExisting=()=>{
 const p=state.pendingWalkaround;if(!p)return;
 const v=state.fleet.find(x=>x.id===p.vehicleId);
 p.acknowledgedExisting=(v.damage||[]).filter(d=>d.status!=="Repaired").map(d=>d.id);
 showModal("Existing Damage Acknowledged",`All currently documented damage on Unit ${v.unit} has been acknowledged on this rental's checkout condition record.<br><br><button onclick="openWalkaround()">Return to Walk-Around</button>`)
}
window.completeWalkaround=()=>{
 const p=state.pendingWalkaround;if(!p)return;
 const r=state.reservations.find(x=>x.id===p.reservationId),v=state.fleet.find(x=>x.id===p.vehicleId),c=state.contracts.find(x=>x.id===p.contractId);
 c.walkaround={completed:true,checkoutMileage:p.checkoutMileage,checkoutFuel:p.checkoutFuel,existingDamageIds:(v.damage||[]).filter(d=>d.status!=="Repaired").map(d=>d.id),completedAt:fmtTime(state.minute)};
 c.status="Open";r.status="Out";v.status="Rented";v.assignedRental=r.id;v.keyLocation="Customer";
 const match=vehicleMatch(r,v);assignmentImpact(r,v,match);
 if((v.damage||[]).filter(d=>d.status!=="Repaired").length===0)adjustRentalSat(r,1,"Clean damage-free walk-around");
 else if(p.newDamage.length>0)adjustRentalSat(r,1,"Existing condition documented before departure");
 c.customerSatisfactionAtCheckout=r.satisfaction;c.reservedClass=r.class;c.actualClass=v.class;c.vehicleMatch=match.type;
 addHistory(v,`Customer walk-around completed with ${r.customer.name}. Vehicle released on ${c.number}.`);
 state.pendingWalkaround=null;state.selectedVehicle=null;
 state.selectedReservation=waiting()[0]?.id||state.reservations.find(x=>x.status==="Booked")?.id||null;
 $("#modal").close();render();
 showModal("Vehicle Released",`${r.customer.name} has completed the walk-around and is leaving in Unit ${v.unit}.<br><br>${satisfactionSummary(r)}<br><small>Customer satisfaction will continue to change if return/billing issues occur.</small>`)
}
window.cancelWalkaround=()=>{
 const p=state.pendingWalkaround;if(!p)return;
 const r=state.reservations.find(x=>x.id===p.reservationId),v=state.fleet.find(x=>x.id===p.vehicleId),c=state.contracts.find(x=>x.id===p.contractId);
 r.status="Waiting";r.assignedVehicle=null;v.status="Ready";v.assignedRental=null;v.keyLocation="Key Cabinet";c.status="Cancelled";
 addHistory(v,`Rental ${c.number} cancelled before vehicle release during walk-around.`);
 state.pendingWalkaround=null;state.selectedVehicle=null;$("#modal").close();render()
}

function renderFacility(){
 $("#readyCount").textContent=`(${state.fleet.filter(v=>v.status==="Ready").length})`;
 $("#returnCount").textContent=`(${state.fleet.filter(v=>v.status==="Returned").length})`;
 $("#cleanCount").textContent=`(${state.fleet.filter(v=>v.status==="Cleaning").length})`;
 $("#fuelCount").textContent=`(${state.fleet.filter(v=>v.status==="Fueling").length})`;
 $("#maintCount").textContent=`(${state.fleet.filter(v=>v.status==="Maintenance").length})`;
 $("#readyRow").innerHTML=state.fleet.filter(v=>v.status==="Ready").slice(0,20).map(v=>lotCar(v)).join("");
 $("#returnLane").innerHTML=state.fleet.filter(v=>["Returned","Walk-Around"].includes(v.status)).map(v=>lotCar(v,true)).join("");
 $("#fuelZone").innerHTML=state.fleet.filter(v=>v.status==="Fueling").map(v=>lotCar(v,true)).join("");
 $("#maintenanceZone").innerHTML=state.fleet.filter(v=>v.status==="Maintenance").map(v=>lotCar(v,true)).join("");
 $("#cleaningBays").innerHTML=state.cleaningBays.map((id,i)=>{let v=state.fleet.find(x=>x.id===id);return `<div class="clean-bay"><strong>Bay ${i+1}</strong>${v?`Unit ${v.unit}<br>${v.model}<div class="timer">${Math.max(0,v.cleanRemaining)} min</div>`:"Available"}</div>`}).join("");
 $("#cleaningQueue").innerHTML=state.cleaningQueue.map(id=>{let v=state.fleet.find(x=>x.id===id);return `<span class="queue-chip">Queued: ${v?.unit||"?"}</span>`}).join("")
}
function lotCar(v,tall=false){return `<div class="lot-car" onclick="vehicleDetails('${v.id}')"><span>${v.unit}</span></div>`}
window.vehicleDetails=id=>vehicleProfile(id)


function renderKpis(){
 const u=utilization();
 const carsOnLot=$("#carsOnLot"), lotBreakdown=$("#lotBreakdown"), todaysRentals=$("#todaysRentals"),
 rentalsBreakdown=$("#rentalsBreakdown"), returnsToday=$("#returnsToday"), returnsBreakdown=$("#returnsBreakdown"),
 utilKpi=$("#utilKpi"), utilBar=$("#utilBar"), satKpi=$("#satKpi"), satBar=$("#satBar"),
 revenueKpi=$("#revenueKpi"), laborKpi=$("#laborKpi"), branchStatus=$("#branchStatus"), branchMessage=$("#branchMessage");
 if(carsOnLot) carsOnLot.textContent=state.fleet.filter(v=>v.status!=="Rented").length;
 if(lotBreakdown) lotBreakdown.textContent=`${ready().length} Ready • ${state.fleet.filter(v=>v.status==="Cleaning").length} Cleaning • ${state.fleet.filter(v=>v.status==="Maintenance").length} Maintenance`;
 if(todaysRentals) todaysRentals.textContent=state.rentalsToday;
 if(rentalsBreakdown) rentalsBreakdown.textContent=`${state.contracts.filter(c=>c.status==="Open").length} currently out`;
 if(returnsToday) returnsToday.textContent=state.returnsToday;
 if(returnsBreakdown) returnsBreakdown.textContent=`${state.fleet.filter(v=>v.status==="Returned").length} in return lane`;
 if(utilKpi) utilKpi.textContent=u+"%";
 if(utilBar) utilBar.style.width=Math.min(100,u)+"%";
 if(satKpi) satKpi.textContent=state.satisfaction+"%";
 if(satBar) satBar.style.width=Math.min(100,state.satisfaction)+"%";
 if(revenueKpi) revenueKpi.textContent=money(state.revenueToday);
 if(laborKpi) laborKpi.textContent=`Labor ${money(state.laborToday)}`;
 if(branchStatus) branchStatus.textContent=`● ${state.branchStatus}`;
 const problems=waiting().length>4||state.fleet.filter(v=>v.status==="Cleaning").length>6||ready().length<5;
 if(branchMessage) branchMessage.textContent=problems?"Operational pressure building — review queue and vehicle readiness.":"Keep up the good work!";
}

function tick(mins=5){
 state.minute+=mins;applyOperatingCosts(mins);processTransfers();syncParking();if(state.minute%30<mins)autoSnapshot("30-minute autosave");if(state.minute%30<mins){maybeManagerVisitor();maybeRareEvent()}if(state.minute%60<mins&&Math.random()<.12)createRoadside();
 if(state.minute>=1140){state.minute=1140;state.running=false;stopTimer();showModal("Branch Close",endOfDayReport())}
 // reservation arrivals
 autonomousStaff();operationalEvents();
 state.reservations.forEach(r=>{if(r.status==="Booked"&&r.pickup<=state.minute){r.status="Waiting";r.arrived=state.minute}});
 // clean bays progress
 state.cleaningBays.forEach((id,i)=>{if(!id)return;let v=state.fleet.find(x=>x.id===id);v.cleanRemaining=Math.max(0,v.cleanRemaining-mins);if(v.cleanRemaining===0){v.clean=100;v.status=v.fuel<6?"Fueling":"Ready";addHistory(v,`Cleaning completed in Bay ${i+1}.`);state.cleaningBays[i]=null}});
 fillCleaningBays();
 // maintenance thresholds can pull vehicles out of service
 state.fleet.filter(v=>v.status==="Ready"&&v.nextService&&v.miles>=v.nextService).slice(0,1).forEach(v=>{v.status="Maintenance";v.keyLocation="Maintenance";state.expensesToday.maintenance+=95;addHistory(v,"Preventive maintenance due; removed from Ready inventory.")});
 // fueling progress random
 if(state.minute%20<mins){let f=state.fleet.find(v=>v.status==="Fueling");if(f){f.fuel=8;f.status="Ready";state.expensesToday.fuel+=28;addHistory(f,"Fueling completed; moved to Ready Row.")}}
 // random return
 if(state.minute%45<mins&&Math.random()<.6){
 let r=state.reservations.find(x=>x.status==="Out");
 if(r){
   let v=state.fleet.find(x=>x.id===r.assignedVehicle);
   if(v){
     r.status="Returned";v.status="Returned";v.miles+=Math.floor(50+Math.random()*260);v.fuel=Math.max(1,Math.floor(2+Math.random()*6));v.clean=Math.floor(45+Math.random()*40);state.returnsToday++;
     let c=state.contracts.find(x=>x.vehicleId===v.id&&x.status==="Open");
     if(c){
       c.returnMileage=v.miles;c.returnFuel=v.fuel;c.status="Returned - Inspection Pending";
       c.returnCharges={fuel:v.fuel<6?(6-v.fuel)*12:0,cleaning:v.clean<55?75:0,late:0,damage:0};
       state.revenueToday+=Object.values(c.returnCharges).reduce((a,n)=>a+n,0)
     }
     if(Math.random()<.20){
       const [area,label]=pick(WALK_AREAS),type=pick(["Scratch","Dent","Chip/Crack","Scuff"]);
       const d={id:uid(),area,type,severity:"Return damage",date:state.date.toLocaleDateString(),status:"New Return Damage",source:"Return inspection"};
       v.damage.push(d);
       addHistory(v,`RETURN DAMAGE: ${type} found at ${label}; not present on checkout condition record.`);
       if(c)c.returnDamageIds=[...(c.returnDamageIds||[]),d.id]
     }
     addHistory(v,`Returned from ${r.customer.name}: ${v.miles.toLocaleString()} miles, ${v.fuel}/8 fuel. Return condition compared with checkout walk-around.`);
   }
 }
}
 // auto inspect a returned car every 20 min
 if(state.minute%20<mins){let v=state.fleet.find(x=>x.status==="Returned");if(v){v.status="Cleaning";v.cleanRemaining=Math.floor(12+Math.random()*35);if(!state.cleaningQueue.includes(v.id)&&!state.cleaningBays.includes(v.id))state.cleaningQueue.push(v.id);addHistory(v,"Return inspection complete; queued for cleaning.");fillCleaningBays()}}
 render()
}
function fillCleaningBays(){
 for(let i=0;i<state.cleaningBays.length;i++){if(!state.cleaningBays[i]&&state.cleaningQueue.length){state.cleaningBays[i]=state.cleaningQueue.shift()}}
}
function nextDay(){
 if(state.pendingWalkaround){return showModal("Finish Current Walk-Around","Complete or cancel the active customer walk-around before advancing to the next day.")}
 state.dailyHistory.unshift({date:state.date.toISOString(),revenue:state.revenueToday,profit:branchProfit(),rentals:state.rentalsToday,satisfaction:state.satisfaction,utilization:utilization()});
 state.dailyHistory=state.dailyHistory.slice(0,30);careerCheck();autoSnapshot("End of day");
 let oldYear=state.date.getFullYear();state.date.setDate(state.date.getDate()+1);if(state.date.getFullYear()>oldYear){state.branchYears++;state.fleet.forEach(v=>{v.year=v.year;v.value=Math.max(4000,(v.value||v.acquisition||30000)*.86)});state.employees.forEach(e=>e.years=(e.years||0)+1)}state.minute=420;state.expensesToday={labor:0,fuel:0,maintenance:0,transfers:0,cleaning:0,adjustments:0};state.employees.forEach(e=>{if(e.status==="Called Off")e.status="Working"});state.revenueToday=0;state.laborToday=0;state.rentalsToday=0;state.returnsToday=0;state.weather=pick(["68°F Clear","61°F Cloudy","58°F Rain","72°F Sunny","64°F Windy"]);
 state.reservations=Array.from({length:15},(_,i)=>makeReservation(i));state.selectedReservation=state.reservations[0].id;
 state.cleaningBays=[null,null,null,null,null,null];state.cleaningQueue=[];
 state.fleet.forEach(v=>{if(v.status==="Rented")v.status="Returned";if(v.status==="Cleaning"){v.cleanRemaining=Math.floor(10+Math.random()*35);state.cleaningQueue.push(v.id)}});fillCleaningBays();render();setTimeout(showMorningBoard,50)
}


function classKey(c){return (c||"").toLowerCase().replace(/\s+/g,"")}
function expectedReturnMinute(r){
 if(r.status==="Out") return Math.min(1080, Math.max(state.minute+30, r.pickup + 240 + ((r.days-1)*15)));
 return null
}


function initParking(){
 if(state.parkingSpaces.length)return;
 const spaces=[];
 for(let i=1;i<=24;i++)spaces.push({id:`R${String(i).padStart(2,"0")}`,zone:"Ready",vehicleId:null});
 for(let i=1;i<=8;i++)spaces.push({id:`RET${i}`,zone:"Return",vehicleId:null});
 for(let i=1;i<=6;i++)spaces.push({id:`C${i}`,zone:"Cleaning",vehicleId:null});
 for(let i=1;i<=3;i++)spaces.push({id:`M${i}`,zone:"Maintenance",vehicleId:null});
 for(let i=1;i<=8;i++)spaces.push({id:`O${i}`,zone:"Overflow",vehicleId:null});
 state.parkingSpaces=spaces;syncParking()
}
function syncParking(){
 if(!state.parkingSpaces?.length)return;
 state.parkingSpaces.forEach(s=>s.vehicleId=null);
 const wanted=v=>v.status==="Ready"?"Ready":v.status==="Returned"?"Return":v.status==="Cleaning"?"Cleaning":v.status==="Maintenance"?"Maintenance":null;
 state.fleet.forEach(v=>{
   const z=wanted(v);if(!z)return;
   let s=state.parkingSpaces.find(x=>x.zone===z&&!x.vehicleId)||state.parkingSpaces.find(x=>x.zone==="Overflow"&&!x.vehicleId);
   if(s){s.vehicleId=v.id;v.parkingSpace=s.id}
 })
}
initParking();

window.moveVehicleSpace=(vid,sid)=>{
 const v=state.fleet.find(x=>x.id===vid),s=state.parkingSpaces.find(x=>x.id===sid);if(!v||!s||s.vehicleId)return;
 state.parkingSpaces.forEach(x=>{if(x.vehicleId===vid)x.vehicleId=null});s.vehicleId=vid;v.parkingSpace=s.id;
 if(s.zone==="Ready")v.status="Ready";if(s.zone==="Return")v.status="Returned";if(s.zone==="Cleaning")v.status="Cleaning";if(s.zone==="Maintenance")v.status="Maintenance";
 addHistory(v,`Moved to parking space ${s.id} (${s.zone}).`);render()
}
window.openParkingSpace=sid=>{
 const s=state.parkingSpaces.find(x=>x.id===sid),v=s?.vehicleId?state.fleet.find(x=>x.id===s.vehicleId):null;
 if(!s)return;if(v)return vehicleProfile(v.id);
 const candidates=state.fleet.filter(v=>["Ready","Returned","Cleaning","Maintenance"].includes(v.status)&&v.parkingSpace!==sid);
 showModal(`Parking Space ${s.id}`,`<p>${s.zone} space is empty.</p>${candidates.slice(0,12).map(v=>`<button onclick="moveVehicleSpace('${v.id}','${s.id}');document.querySelector('#modal').close()">${v.unit} ${v.model}</button>`).join(" ")}`)
}

function maybeManagerVisitor(){
 if(state.managerVisitors.some(x=>x.status==="Waiting"))return;
 if(Math.random()<.035){
   const e=pick(state.employees.filter(x=>x.status==="Working"));
   if(e)state.managerVisitors.push({id:uid(),employee:e.name,reason:pick(["Upset customer needs manager help","Schedule question","Pay question","Vehicle problem at the counter","Needs approval for a customer adjustment"]),status:"Waiting",minute:state.minute})
 }
}
window.handleVisitor=id=>{
 let x=state.managerVisitors.find(v=>v.id===id);if(!x)return;
 showModal(`${x.employee} is at your door`,`<div class="office-convo">"${x.reason}. Do you have a minute?"</div><button onclick="resolveVisitor('${id}','talk')">Talk Now</button> <button onclick="resolveVisitor('${id}','delegate')">Delegate It</button> <button onclick="resolveVisitor('${id}','later')">Ask Them to Return Later</button>`)
}
window.resolveVisitor=(id,a)=>{let x=state.managerVisitors.find(v=>v.id===id);if(!x)return;x.status="Resolved";x.result=a;if(a==="talk")state.satisfaction=Math.min(100,state.satisfaction+1);if(a==="later")state.satisfaction=Math.max(0,state.satisfaction-1);$("#modal").close();render()}

function createRoadside(){
 const v=pick(state.fleet.filter(x=>x.status==="Rented"));if(!v)return;
 if(state.roadsideCases.some(x=>x.vehicleId===v.id&&x.status==="Open"))return;
 state.roadsideCases.push({id:uid(),vehicleId:v.id,customer:"Current renter",distance:Math.floor(8+Math.random()*55),problem:pick(["Check-engine light and shaking","Flat tire","Vehicle will not start","Warning light and reduced power","Keys locked inside vehicle"]),status:"Open",cost:0})
}
window.openRoadside=id=>{
 let c=state.roadsideCases.find(x=>x.id===id),v=state.fleet.find(x=>x.id===c?.vehicleId);if(!c||!v)return;
 showModal("Roadside Assistance",`<div class="event-card roadside-card"><b>Unit ${v.unit} — ${v.model}</b><br>${c.distance} miles from branch<br><br>"${c.problem}"</div>
 <button onclick="resolveRoadside('${id}','roadside')">Dispatch Roadside</button> <button onclick="resolveRoadside('${id}','replacement')">Send Replacement</button> <button onclick="resolveRoadside('${id}','tow')">Authorize Tow</button>`)
}
window.resolveRoadside=(id,a)=>{let c=state.roadsideCases.find(x=>x.id===id),v=state.fleet.find(x=>x.id===c?.vehicleId);if(!c||!v)return;c.status="Resolved";
 if(a==="roadside"){c.cost=85;state.expensesToday.maintenance+=85}
 if(a==="replacement"){c.cost=45;state.expensesToday.transfers+=45;let repl=state.fleet.find(x=>x.status==="Ready"&&x.class===v.class);if(repl){repl.status="Rented";repl.keyLocation="Customer"}}
 if(a==="tow"){c.cost=225;state.expensesToday.maintenance+=225;v.status="Maintenance";v.keyLocation="Repair Shop";addHistory(v,`Towed after roadside case: ${c.problem}`)}
 $("#modal").close();syncParking();render()
}

function maybeRareEvent(){
 if(state.rareEvents.some(e=>e.status==="Active"))return;
 if(Math.random()<.008){
  const type=pick(["Major Corporate Booking","Credit Card Outage","Recall Notice","Severe Weather Extensions","Transporter Delivery"]);
  let ev={id:uid(),type,status:"Active",minute:state.minute};
  if(type==="Major Corporate Booking"){ev.text="A local manufacturer needs 12 vehicles tomorrow.";state.reservations.push(...[])}
  if(type==="Credit Card Outage")ev.text="Card authorizations may fail for the next two game hours.";
  if(type==="Recall Notice"){let vs=state.fleet.filter(v=>v.status==="Ready").slice(0,Math.min(4,state.fleet.length));vs.forEach(v=>{v.status="Maintenance";v.recall="OPEN RECALL"});ev.text=`${vs.length} vehicles were grounded by a new recall.`}
  if(type==="Severe Weather Extensions"){ev.text="Snow is causing multiple renters to extend. Tomorrow's availability may tighten.";state.reservations.filter(r=>r.status==="Out").slice(0,4).forEach(r=>r.days++)}
  if(type==="Transporter Delivery"){ev.text="Corporate is sending 4 new fleet units. They require intake before rental.";createFleetDelivery(4)}
  state.rareEvents.push(ev)
 }
}
window.resolveRareEvent=id=>{let e=state.rareEvents.find(x=>x.id===id);if(e)e.status="Resolved";render()}

function createFleetDelivery(n=4){
 for(let i=0;i<n;i++)state.fleetDeliveries.push({id:uid(),unit:String(3200+state.fleetDeliveries.length+state.fleet.length),model:pick(["2027 Chevrolet Equinox","2027 Toyota Camry","2027 Nissan Rogue","2027 Chrysler Pacifica"]),status:"Awaiting Intake"})
}
window.intakeFleet=id=>{
 let d=state.fleetDeliveries.find(x=>x.id===id);if(!d)return;
 let v=makeVehicle(state.fleet.length+1);v.unit=d.unit;v.model=d.model.replace(/^2027 /,"");v.year=2027;v.status="Ready";v.clean=100;v.fuel=8;v.miles=Math.floor(4+Math.random()*20);v.keyLocation="Key Cabinet";v.acquisition=32000;v.history=[];addHistory(v,"New fleet delivery received, inspected, fueled and staged.");state.fleet.push(v);d.status="In Service";syncParking();render()
}

function initBranchRelationships(){
 state.branches.forEach(b=>{if(!state.branchRelationships[b.name])state.branchRelationships[b.name]={score:Math.floor(45+Math.random()*45),manager:pick(["Morgan Reed","Chris Walker","Dana Lopez","Taylor Bennett"])}});
}
initBranchRelationships();
window.callBranch=name=>{
 let rel=state.branchRelationships[name];if(!rel)return;
 const helpful=rel.score>=60;
 showModal(`${name} — ${rel.manager}`,`<div class="office-convo">Relationship ${rel.score}/100<br><br>${helpful?'"Tell me what you need. If I have the cars, I can help you out."':'"We are pretty tight ourselves. I cannot promise much today."'}</div><button onclick="documentBranchCall('${name}',${helpful})">${helpful?"Ask for Fleet Help":"Ask Anyway"}</button>`)
}
window.documentBranchCall=(name,helpful)=>{let rel=state.branchRelationships[name];rel.score=Math.max(0,Math.min(100,rel.score+(helpful?1:-2)));$("#modal").close();render()}

window.officeAction=a=>{
 if(a==="computer"){let b=$$(".nav-btn").find(x=>x.dataset.screen==="planner");if(b)b.click()}
 if(a==="phone"){let q=state.phoneQueue[0];if(q)answerPhone(q.id);else showModal("Manager Phone","No calls are waiting right now.")}
 if(a==="inbox")showModal("Manager Inbox",`${state.managerInbox.slice(0,8).map(x=>`<p>${x}</p>`).join("")||"<p>Inbox is clear.</p>"}`)
 if(a==="whiteboard")showMorningBoard()
 if(a==="window"){let b=$$(".nav-btn").find(x=>x.dataset.screen==="lot");if(b)b.click()}
 if(a==="calendar"){let b=$$(".nav-btn").find(x=>x.dataset.screen==="planner");if(b)b.click()}
}

function areaManagerEligible(){return state.career.xp>=100&&state.dailyHistory.length>=10}
window.acceptAreaRole=()=>{
 if(!areaManagerEligible())return showModal("Area Manager","Keep building your branch performance before this role becomes available.");
 state.areaMode=true;state.career.title="Area Manager — Northeast Indiana";state.managedBranches=["Warsaw","Columbia City","Goshen","Fort Wayne Airport","Fort Wayne Downtown"];
 showModal("Promotion Accepted","You now oversee five Horizon branches. The Corporate screen has become your regional management view.");render()
}

function ensureCustomerProfiles(){
 state.reservations.forEach(r=>{
   let p=state.customerProfiles.find(x=>x.id===r.customer.id);
   if(!p){
     const loyalty=Math.random()<.22?"Emerald Elite":Math.random()<.45?"Horizon Rewards":"None";
     p={id:r.customer.id,name:r.customer.name,email:r.customer.email||`${r.customer.name.toLowerCase().replace(/\s/g,".")}@example.com`,
       phone:r.customer.phone||`(574) 555-${String(Math.floor(1000+Math.random()*8999))}`,loyalty,
       rentals:Math.floor(Math.random()*8),lifetimeSpend:Math.floor(Math.random()*4800),complaints:[],preferences:[],
       dnr:false,notes:[],history:[],favoriteClass:r.class,created:state.date.toISOString()};
     if(Math.random()<.25)p.preferences.push(pick(["Prefers newer vehicles","Needs Apple CarPlay","Avoids Nissan","Likes SUVs","Usually declines protection","Prefers third-row seating"]));
     state.customerProfiles.push(p)
   }
 })
}
ensureCustomerProfiles();

function customerProfile(id){return state.customerProfiles.find(x=>x.id===id)}
window.openCustomerProfile=id=>{
 const p=customerProfile(id);if(!p)return;
 const rentals=state.contracts.filter(c=>c.customerId===id);
 showModal("Customer Profile",`<div class="agreement-paper"><h2>${p.name} ${p.dnr?'<span class="dnr-badge">DO NOT RENT</span>':p.loyalty!=="None"?`<span class="loyalty-badge">${p.loyalty}</span>`:""}</h2>
 <div class="agreement-cols"><div class="agreement-box"><b>Contact</b><br>${p.email}<br>${p.phone}<br><br><b>Favorite Class:</b> ${p.favoriteClass}<br><b>Lifetime Spend:</b> ${money(p.lifetimeSpend)}</div>
 <div class="agreement-box"><b>Rental History</b><br>${p.rentals+rentalCount(p.id)} total rentals<br>${p.complaints.length} complaints<br><b>Average Satisfaction:</b> ${p.satisfactionHistory?.length?Math.round(p.satisfactionHistory.reduce((a,n)=>a+n,0)/p.satisfactionHistory.length)+"%":"No completed score"}<br><b>Preferences:</b><br>${p.preferences.join("<br>")||"None recorded"}</div></div>
 <h3>Notes / History</h3>${[...p.notes,...p.history].slice(-8).map(x=>`<p>${x}</p>`).join("")||"<p>No history yet.</p>"}
 <div class="walkaround-actions"><button onclick="toggleDNR('${p.id}')">${p.dnr?"Remove DNR":"Place on Do Not Rent"}</button><button onclick="addCustomerNote('${p.id}')">Add Note</button></div></div>`)
}
function rentalCount(id){return state.contracts.filter(c=>c.customerId===id).length}
window.toggleDNR=id=>{let p=customerProfile(id);if(!p)return;p.dnr=!p.dnr;if(p.dnr&&!state.dnr.includes(id))state.dnr.push(id);if(!p.dnr)state.dnr=state.dnr.filter(x=>x!==id);p.history.push(`${state.date.toLocaleDateString()}: ${p.dnr?"Placed on":"Removed from"} Do Not Rent.`);openCustomerProfile(id);render()}
window.addCustomerNote=id=>{let p=customerProfile(id);if(!p)return;let note=prompt("Customer note:");if(note){p.notes.push(`${state.date.toLocaleDateString()}: ${note}`);openCustomerProfile(id)}}

function estimateAgreement(r,v){
 const base=r.rate*r.days, products=(r.products?.damage?24.99*r.days:0)+(r.products?.liability?14.99*r.days:0)+(r.products?.roadside?6.99*r.days:0)+(r.products?.driver?7*r.days:0)+(r.products?.seat?13*r.days:0)+(r.products?.fuel?64.99:0);
 const subtotal=base+products, taxes=subtotal*.09, fees=6.5, total=subtotal+taxes+fees;
 return {base,products,subtotal,taxes,fees,total,deposit:Math.max(200,Math.round(total*.35))}
}
window.openAgreementPreview=()=>{
 const r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle);if(!r||!v)return showModal("Rental Agreement","Select an exact vehicle first.");
 const p=customerProfile(r.customer.id);if(!r.coverageConfirmed)return askCustomerCoverage();if(p?.dnr)return showModal("Do Not Rent Alert",`${p.name} is currently on the Do Not Rent list. Manager override is required.`);
 const a=estimateAgreement(r,v);
 $("#modalBody").innerHTML=`<div class="agreement-paper"><div class="next-step"><strong>STEP 2 OF 4:</strong> Review agreement → authorize payment → sign → walk-around.</div><h2>HORIZON RENTAL AGREEMENT — ESTIMATE</h2>
 <div class="agreement-cols"><div class="agreement-box"><b>Renter</b><br>${r.customer.name}<br>${p?.loyalty||"Non-member"}<br><br><b>Reservation</b> ${r.code||r.id}</div>
 <div class="agreement-box"><b>Vehicle</b><br>Unit ${v.unit} — ${v.model}<br>${v.class}<br>Mileage ${v.miles.toLocaleString()} • Fuel ${v.fuel}/8</div></div>
 <table class="history-table"><tr><td>Base rental (${r.days} days)</td><td>${money(a.base)}</td></tr><tr><td>Protection / options</td><td>${money(a.products)}</td></tr><tr><td>Taxes</td><td>${money(a.taxes)}</td></tr><tr><td>Fees</td><td>${money(a.fees)}</td></tr><tr><th>Estimated Total</th><th>${money(a.total)}</th></tr><tr><td>Card Authorization / Deposit</td><td>${money(a.deposit)}</td></tr></table>
 <div class="signature-box"><b>Customer signature:</b><br><i>Pending electronic signature</i></div>
 <div class="walkaround-actions"><button onclick="authorizePayment()">Authorize Payment</button><button class="primary" onclick="signAgreement()">Sign & Continue to Walk-Around</button></div></div>`;
 $("#modal").showModal()
}
window.authorizePayment=()=>{
 const r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle);if(!r||!v)return;
 const a=estimateAgreement(r,v),declined=Math.random()<.08;
 r.paymentAuthorized=!declined;r.authorizationAmount=a.deposit;
 state.paymentEvents.unshift({date:state.date.toISOString(),customer:r.customer.name,amount:a.deposit,status:declined?"Declined":"Approved"});
 showModal(declined?"Card Declined":"Authorization Approved",declined?`The card authorization for ${money(a.deposit)} was declined. Try another payment method.`:`Authorization approved for ${money(a.deposit)}.<br><br><button onclick="openAgreementPreview()">Return to Agreement</button>`)
}
window.signAgreement=()=>{
 const r=selected();if(!r)return;
 if(!r.paymentAuthorized)return showModal("Payment Required","Authorize the renter's payment method before signing the agreement.");
 r.agreementSigned=true;$("#modal").close();showModal("Agreement Signed",`Agreement signed and payment authorized.<div class="next-step"><strong>NEXT STEP:</strong> Walk outside with ${r.customer.name} and inspect the assigned vehicle together.</div><button class="primary" onclick="document.querySelector(\'#modal\').close();assignVehicle(state.selectedVehicle)">Start Vehicle Walk-Around →</button>`)
}



const VEHICLE_CAPACITY={"Economy":5,"Midsize":5,"Full Size":5,"SUV":5,"Premium SUV":7,"Minivan":7,"Pickup":5};
const CLASS_RANK={"Economy":1,"Midsize":2,"Full Size":3,"SUV":4,"Premium SUV":5,"Minivan":5,"Pickup":4};

function ensureRentalExperience(r){
 if(!r)return;
 if(!Number.isFinite(r.satisfaction))r.satisfaction=82;
 if(!Array.isArray(r.satEvents))r.satEvents=[];
 if(!r.promise){
   const family=r.customer.type==="Leisure"&&Math.random()<.45;
   const party=family?Math.floor(3+Math.random()*4):Math.floor(1+Math.random()*3);
   const luggage=family?Math.floor(3+Math.random()*4):Math.floor(1+Math.random()*3);
   const reason=r.customer.note==="Insurance replacement"?"Insurance replacement":r.customer.type==="Business"?"Business trip":family?"Family trip":"Personal travel";
   const mustHave=[];
   if(family&&party>=5)mustHave.push("Enough room for family");
   if(r.customer.note==="Needs child seat")mustHave.push("Child seat");
   if(["SUV","Premium SUV","Minivan"].includes(r.class)&&family)mustHave.push("Cargo space");
   r.promise={party,luggage,reason,mustHave};
 }
}
state.reservations.forEach(ensureRentalExperience);

function satLabel(score){
 if(score>=95)return["Delighted","sat-great"];
 if(score>=85)return["Very satisfied","sat-good"];
 if(score>=70)return["Satisfied","sat-mid"];
 if(score>=50)return["Dissatisfied","sat-bad"];
 return["Very dissatisfied","sat-bad"]
}
function adjustRentalSat(r,delta,reason){
 ensureRentalExperience(r);
 r.satisfaction=Math.max(0,Math.min(100,Math.round(r.satisfaction+delta)));
 r.satEvents.push({minute:state.minute,delta,reason});
 state.satisfaction=Math.max(0,Math.min(100,Math.round(state.satisfaction+(delta/12))));
}
function waitMinutes(r){return Math.max(0,state.minute-(r.arrived??r.pickup))}
function applyWaitExperience(r){
 if(r.waitScored)return;
 const w=waitMinutes(r);r.waitScored=true;
 state.satisfactionMetrics.totalWait+=w;state.satisfactionMetrics.waitCount++;
 if(w<=5)adjustRentalSat(r,3,`Quick counter wait (${w} min)`);
 else if(w<=10)adjustRentalSat(r,0,`Acceptable counter wait (${w} min)`);
 else if(w<=20)adjustRentalSat(r,-5,`Long counter wait (${w} min)`);
 else adjustRentalSat(r,-12,`Very long counter wait (${w} min)`);
}

function vehicleMatch(r,v){
 ensureRentalExperience(r);
 const exact=v.class===r.class;
 const rankDiff=(CLASS_RANK[v.class]||0)-(CLASS_RANK[r.class]||0);
 let type=exact?"exact":rankDiff>0?"upgrade":"substitute";
 let severity=0,reasons=[],reaction="";
 if(exact){reasons.push("Reserved class matched");reaction=`That ${v.class.toLowerCase()} is exactly what I reserved.`}
 else if(rankDiff>0){severity=1;reasons.push(`Free class upgrade from ${r.class} to ${v.class}`);reaction=`I reserved a ${r.class.toLowerCase()}, but the ${v.class.toLowerCase()} could work if the price stays the same.`}
 else {severity=3;reasons.push(`Wrong class: reserved ${r.class}, offered ${v.class}`);reaction=`I reserved a ${r.class.toLowerCase()}. I wasn't expecting a ${v.class.toLowerCase()}.`}

 const capacity=VEHICLE_CAPACITY[v.class]||5;
 if(r.promise.party>capacity){severity=5;reasons.push(`Seats only ${capacity} for party of ${r.promise.party}`);reaction=`That won't work. There are ${r.promise.party} of us and we need enough seats.`}
 if(r.promise.mustHave.includes("Cargo space")&&["Economy","Midsize","Full Size","Pickup"].includes(v.class)){severity=Math.max(severity,4);reasons.push("Does not meet cargo-space need");reaction=`We have a lot of luggage. I really need the SUV or minivan space I reserved.`}

 const cp=customerProfile(r.customer.id);
 if(cp?.preferences?.includes("Avoids Nissan")&&/Nissan/i.test(v.model)){severity=Math.max(severity,2);reasons.push("Conflicts with saved Nissan preference");reaction=`Do you have anything besides a Nissan? I had asked for that before.`}
 if(cp?.preferences?.includes("Prefers newer vehicles")&&v.year<2026){severity=Math.max(severity,2);reasons.push("Older than customer preference")}
 if(v.clean<70){severity=Math.max(severity,3);reasons.push(`Vehicle cleanliness only ${v.clean}%`)}
 else if(v.clean<90){severity=Math.max(severity,2);reasons.push(`Vehicle needs touch-up (${v.clean}% clean)`)}
 if(v.fuel<5){severity=Math.max(severity,2);reasons.push(`Low fuel (${v.fuel}/8)`)}
 if((v.damage||[]).filter(d=>d.status!=="Repaired").length>=2){severity=Math.max(severity,2);reasons.push("Multiple existing damage items")}
 return {exact,type,severity,reasons,reaction}
}

function assignmentImpact(r,v,match){
 if(r.assignmentScoredFor===v.id)return;
 r.assignmentScoredFor=v.id;
 state.satisfactionMetrics.totalAssignments++;
 if(match.exact){state.satisfactionMetrics.exactClass++;adjustRentalSat(r,5,"Received reserved vehicle class")}
 else if(match.type==="upgrade"){adjustRentalSat(r,4,`Complimentary upgrade to ${v.class}`)}
 else adjustRentalSat(r,-8,`Accepted substitute ${v.class} instead of reserved ${r.class}`);
 if(v.clean>=95)adjustRentalSat(r,3,"Vehicle presented exceptionally clean");
 else if(v.clean<70)adjustRentalSat(r,-8,"Vehicle was visibly dirty");
 else if(v.clean<90)adjustRentalSat(r,-3,"Vehicle needed cleaning touch-up");
 if(v.fuel>=7)adjustRentalSat(r,2,"Vehicle provided with near-full fuel");
 else if(v.fuel<5)adjustRentalSat(r,-4,"Vehicle provided with low fuel");
}

window.handleVehiclePromise=(id)=>{
 const r=selected(),v=state.fleet.find(x=>x.id===id);if(!r||!v)return;
 ensureRentalExperience(r);applyWaitExperience(r);
 state.selectedVehicle=id;
 const m=vehicleMatch(r,v);
 if(m.exact){
   r.substitutionApproved=true;
   assignmentImpact(r,v,m);
   return startCoverageAfterMatch(r,v,m)
 }
 showVehicleMismatchConversation(r,v,m)
}
function startCoverageAfterMatch(r,v,m){
 r.checkoutStage="coverage";r.customerCoverageRequest=null;r.coverageConfirmed=false;customerCoverageRequest(r);render();
 showModal("Vehicle Match Confirmed",`<div class="match-card"><b>${m.exact?"Reserved class matched":"Customer accepted vehicle"}</b><br>Unit ${v.unit} — ${v.model} • ${v.class}</div>
 <div class="office-convo"><b>${r.customer.name}:</b><br>"${m.reaction}"</div>
 <div class="next-step"><strong>NEXT:</strong> Ask what coverage the customer wants.</div>
 <button class="primary" onclick="showCheckoutCoverage()">Continue to Coverage →</button>`)
}
function showVehicleMismatchConversation(r,v,m){
 const severe=m.severity>=4;
 const hasCorrect=ready().some(x=>x.class===r.class&&x.id!==v.id);
 state.satisfactionMetrics.complaints++;
 showModal("Customer Questions the Vehicle",`
 <div class="match-card ${severe?"bad":"warn"}"><b>Reservation Promise:</b> ${r.class}<br><b>Selected:</b> ${v.class} — ${v.model}<br>${m.reasons.join("<br>")}</div>
 <div class="office-convo"><b>${r.customer.name}:</b><br><br>"${m.reaction}"</div>
 <div class="promise-card"><b>Trip needs</b><br>${r.promise.reason} • ${r.promise.party} people • ${r.promise.luggage} luggage item(s)<br>${r.promise.mustHave.join(" • ")||"No special requirements"}</div>
 <button class="primary" onclick="findCorrectVehicle()">Find Reserved ${r.class}</button>
 ${!severe?`<button onclick="customerAcceptSubstitute('${v.id}','none')">Ask Customer to Accept Substitute</button>`:""}
 <button onclick="customerAcceptSubstitute('${v.id}','discount')">Offer $25 Service Recovery</button>
 ${m.type==="upgrade"?`<button onclick="customerAcceptSubstitute('${v.id}','freeupgrade')">Confirm Free Upgrade</button>`:""}
 ${hasCorrect?"<p><small>A matching ready vehicle is available.</small></p>":"<p><small>No other matching ready vehicle is currently on the lot.</small></p>"}
 `)
}
window.findCorrectVehicle=()=>{
 const r=selected();if(!r)return;
 state.selectedVehicle=null;vehicleFilter="available";
 $("#modal").close();render();
 showModal("Find Reserved Class",`Vehicle list is filtered back to <b>${r.class}</b>. Select a matching unit to protect the reservation promise.`)
}
window.customerAcceptSubstitute=(vid,recovery)=>{
 const r=selected(),v=state.fleet.find(x=>x.id===vid);if(!r||!v)return;
 const m=vehicleMatch(r,v);
 if(m.severity>=5 && recovery!=="discount")return showModal("Vehicle Cannot Meet Trip Need",`This vehicle does not have enough capacity for the customer's trip. Choose a different vehicle.`);
 r.substitutionApproved=true;
 if(recovery==="discount"){
   state.expensesToday.adjustments+=25;state.serviceRecoveries.push({date:state.date.toISOString(),customer:r.customer.name,amount:25,reason:`Vehicle substitution ${r.class} → ${v.class}`});
   adjustRentalSat(r,5,"Manager offered $25 service recovery");
 }
 if(recovery==="freeupgrade")adjustRentalSat(r,3,"Manager clearly confirmed complimentary upgrade");
 assignmentImpact(r,v,m);
 $("#modal").close();startCoverageAfterMatch(r,v,m)
}

function satisfactionSummary(r){
 ensureRentalExperience(r);const [label,cls]=satLabel(r.satisfaction);
 return `<span class="sat-chip ${cls}">${r.satisfaction}/100 — ${label}</span>`
}

function reviewForRental(r,v,c){
 if(r.reviewGenerated)return state.customerReviews.find(x=>x.reservationId===r.id);
 const score=r.satisfaction;
 let stars=score>=92?5:score>=80?4:score>=65?3:score>=45?2:1;
 const negatives=r.satEvents.filter(e=>e.delta<0).sort((a,b)=>a.delta-b.delta).slice(0,2).map(e=>e.reason);
 const positives=r.satEvents.filter(e=>e.delta>0).sort((a,b)=>b.delta-a.delta).slice(0,2).map(e=>e.reason);
 let text;
 if(stars>=5)text=`Great experience. ${positives[0]||"The branch made pickup easy"} and the vehicle worked well for my trip.`;
 else if(stars===4)text=`Overall a good rental. ${positives[0]||"Service was helpful"}. ${negatives[0]?`The only issue was ${negatives[0].toLowerCase()}.`:""}`;
 else if(stars===3)text=`The rental was okay, but ${negatives[0]?.toLowerCase()||"there were some service issues"}.`;
 else text=`I was disappointed because ${negatives.join(" and ").toLowerCase()||"the rental did not match what I expected"}.`;
 const review={id:uid(),reservationId:r.id,customerId:r.customer.id,customer:r.customer.name,vehicleId:v?.id,agreement:c?.number,stars,text,score,date:state.date.toISOString()};
 state.customerReviews.unshift(review);r.reviewGenerated=true;
 const p=customerProfile(r.customer.id);if(p){p.satisfactionHistory=p.satisfactionHistory||[];p.satisfactionHistory.push(score);p.history.push(`${state.date.toLocaleDateString()}: Left a ${stars}-star review — "${text}"`)}
 return review
}

function satisfactionStats(){
 const completed=state.customerReviews;
 const avg=completed.length?Math.round(completed.reduce((a,x)=>a+x.score,0)/completed.length):state.satisfaction;
 const exact=state.satisfactionMetrics.totalAssignments?Math.round(state.satisfactionMetrics.exactClass/state.satisfactionMetrics.totalAssignments*100):100;
 const wait=state.satisfactionMetrics.waitCount?Math.round(state.satisfactionMetrics.totalWait/state.satisfactionMetrics.waitCount):0;
 return {avg,exact,wait,reviews:completed.length,complaints:state.satisfactionMetrics.complaints}
}

function customerCoverageRequest(r){
 if(r.customerCoverageRequest)return r.customerCoverageRequest;
 const profile=customerProfile(r.customer.id);
 let type;
 if(profile?.preferences?.includes("Usually declines protection")) type="none";
 else type=pick(["ldw","ldw-roadside","full","none","roadside"]);
 const map={
  "ldw":{text:"I want the damage waiver, but I don't need the other extras.",products:{damage:true,liability:false,roadside:false,fuel:false,driver:false,seat:false}},
  "ldw-roadside":{text:"I'd like the damage waiver and roadside assistance.",products:{damage:true,liability:false,roadside:true,fuel:false,driver:false,seat:false}},
  "full":{text:"I want the full coverage options you offer — damage waiver, liability, and roadside.",products:{damage:true,liability:true,roadside:true,fuel:false,driver:false,seat:false}},
  "none":{text:"No extra coverage for me. I'll use my own insurance.",products:{damage:false,liability:false,roadside:false,fuel:false,driver:false,seat:false}},
  "roadside":{text:"I don't want the damage coverage, but add roadside assistance.",products:{damage:false,liability:false,roadside:true,fuel:false,driver:false,seat:false}}
 };
 r.customerCoverageRequest={type,...map[type]};
 return r.customerCoverageRequest
}
window.askCustomerCoverage=()=>{
 const r=selected();if(!r)return;
 const req=customerCoverageRequest(r);
 showModal("Customer Coverage Request",`<div class="office-convo"><b>${r.customer.name}:</b><br>"${req.text}"</div>
 <div class="next-step"><strong>CUSTOMER CHOICE:</strong> This is what the renter is asking for. Click Apply Customer Request and the rental agreement will open automatically.</div>
 <button class="primary" onclick="applyCustomerCoverage()">Apply Customer Request</button> <button onclick="openProtection()">Review / Change Products</button>`)
}
window.applyCustomerCoverage=()=>{
 const r=selected();if(!r)return;
 const req=customerCoverageRequest(r);
 r.products={...req.products};
 r.protectionDecision=req.type==="none"?"Declined":"Customer Selected";
 r.coverageConfirmed=true;
 $("#modal").close();
 render();
 setTimeout(()=>openAgreementPreview(),50)
}

function protectionConversation(r){
 const p=customerProfile(r.customer.id),lines=[];
 if(p?.preferences.includes("Usually declines protection"))lines.push(`"${r.customer.name}: I normally don't take the extra coverage. What exactly does it cover?"`);
 else lines.push(`"${r.customer.name}: Can you explain what happens if the vehicle gets damaged?"`);
 lines.push(`LDW: ${money(24.99)}/day • Supplemental Liability: ${money(14.99)}/day • Roadside: ${money(6.99)}/day`);
 return lines.join("<br><br>")
}
window.deepProtection=()=>askCustomerCoverage()

function closeReturnAgreement(v){
 if(!v)return;
 const c=state.contracts.find(x=>x.vehicleId===v.id&&String(x.status).includes("Returned"));
 if(!c)return showModal("Return Agreement","No returned agreement is waiting to be closed for this vehicle.");
 const r=state.reservations.find(x=>x.id===v.assignedRental)||state.reservations.find(x=>x.customer?.id===c.customerId);
 if(!r)return showModal("Return Agreement","The rental record could not be found.");
 const charges=c.returnCharges||{fuel:0,cleaning:0,late:0,damage:0};
 const extra=Object.values(charges).reduce((a,n)=>a+(Number(n)||0),0);
 c.finalTotal=(c.daily||r.rate||0)*(c.days||r.days||1)+extra;c.status="Closed";c.closedAt=fmtTime(state.minute);
 if(charges.fuel>0)adjustRentalSat(r,-3,"Fuel charge at return");
 if(charges.cleaning>0)adjustRentalSat(r,-6,"Heavy cleaning charge at return");
 if(charges.damage>0)adjustRentalSat(r,-10,"Damage charge at return");
 if(extra===0)adjustRentalSat(r,3,"Fast return with no added charges");
 const cp=customerProfile(r.customer.id);
 if(cp){cp.lifetimeSpend=(cp.lifetimeSpend||0)+c.finalTotal;cp.rentals=(cp.rentals||0)+1}
 const review=reviewForRental(r,v,c);
 v.status="Cleaning";v.cleanRemaining=Math.floor(12+Math.random()*25);v.keyLocation="Cleaning Bay";
 if(!state.cleaningQueue.includes(v.id)&&!state.cleaningBays.includes(v.id))state.cleaningQueue.push(v.id);
 fillCleaningBays();addHistory(v,`Agreement ${c.number} closed. Customer satisfaction ${r.satisfaction}/100; review ${review.stars} stars.`);
 render();
 const stars="★".repeat(review.stars)+"☆".repeat(5-review.stars);
 showModal("Final Receipt & Customer Review",`<h3>${c.number} — ${r.customer.name}</h3><p>Final total: <b>${money(c.finalTotal)}</b></p><p>${satisfactionSummary(r)}</p><div class="review-card"><div class="review-stars">${stars}</div><b>${review.stars}-star customer review</b><p>"${review.text}"</p></div>`)
}

window.openReturnDesk=id=>{let v=state.fleet.find(x=>x.id===id);if(!v)return;let c=state.contracts.find(x=>x.vehicleId===v.id&&String(x.status).includes("Returned"));showModal("Return Desk",`<h2>Unit ${v.unit} — ${v.model}</h2><p>Mileage ${v.miles.toLocaleString()} • Fuel ${v.fuel}/8 • Cleanliness ${v.clean}%</p><p>${c?`Agreement ${c.number}<br>Fuel charge ${money(c.returnCharges?.fuel||0)} • Cleaning ${money(c.returnCharges?.cleaning||0)}`:"No returned agreement found."}</p><button onclick="closeReturnAgreementById('${v.id}')">Close Agreement & Print Receipt</button>`)}
window.closeReturnAgreementById=id=>{let v=state.fleet.find(x=>x.id===id);$("#modal").close();closeReturnAgreement(v)}

function vehicleFinancials(v){
 const maintenance=(v.history||[]).filter(h=>/maintenance|repair|tire|oil/i.test(h.text)).length*120;
 const value=Math.max(5500,(v.acquisition||30000)-(v.miles*.16)-((2026-v.year)*2200));
 return {maintenance,value,profit:(v.revenue||0)-maintenance,roi:((v.revenue||0)/Math.max(1,v.acquisition||30000))*100}
}
window.vehicleProfile=(id,tab="overview")=>{
 const v=state.fleet.find(x=>x.id===id);if(!v)return;const f=vehicleFinancials(v);
 let body="";
 if(tab==="overview")body=`Status ${v.status}<br>Mileage ${v.miles.toLocaleString()}<br>Fuel ${v.fuel}/8<br>Key: ${v.keyLocation}${v.status==="Returned"?`<br><br><button onclick="openReturnDesk(\'${v.id}\')">Open Return Desk</button>`:""}`;
 if(tab==="rentals")body=(v.history||[]).filter(h=>/rental|returned|customer/i.test(h.text)).map(h=>`${h.date}: ${h.text}`).join("<br>")||"No rental history.";
 if(tab==="damage")body=(v.damage||[]).map(d=>`${d.date}: ${d.type} — ${d.area} (${d.status})`).join("<br>")||"No damage history.";
 if(tab==="maintenance")body=(v.history||[]).filter(h=>/maintenance|repair|fuel|service/i.test(h.text)).map(h=>`${h.date}: ${h.text}`).join("<br>")||"No maintenance history.";
 if(tab==="financials")body=`Acquisition: ${money(v.acquisition||30000)}<br>Lifetime rental revenue: ${money(v.revenue||0)}<br>Estimated maintenance: ${money(f.maintenance)}<br>Wholesale estimate: ${money(f.value)}<br>Operating contribution: ${money(f.profit)}<br>Revenue/Acquisition: ${f.roi.toFixed(1)}%`;
 if(tab==="ownership")body=`Model year: ${v.year}<br>Branch unit: ${v.unit}<br>Current wholesale estimate: ${money(f.value)}<br>${v.miles>55000?`<b>Fleet Disposal Candidate</b><br><button onclick="disposeVehicle('${v.id}')">Recommend Sell</button>`:"Corporate recommends keeping this unit in service."}`;
 showModal(`Unit ${v.unit} — ${v.model}`,`<div class="vehicle-tabs">${["overview","rentals","damage","maintenance","financials","ownership"].map(t=>`<button onclick="vehicleProfile('${v.id}','${t}')">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div><div class="agreement-box">${body}</div>`)
}
window.disposeVehicle=id=>{let v=state.fleet.find(x=>x.id===id);if(!v||v.status==="Rented")return showModal("Fleet Disposal","Rented vehicles cannot be disposed.");let f=vehicleFinancials(v);state.fleetSales.push({unit:v.unit,model:v.model,value:f.value,date:state.date.toISOString()});state.fleet=state.fleet.filter(x=>x.id!==id);$("#modal").close();render()}

window.employeeOffice=name=>{
 let e=state.employees.find(x=>x.name===name);if(!e)return;
 const issue=e.years>=3&&e.pay<22?`${e.name}: "I've been here ${e.years} years and I'd like to talk about my pay."`:`${e.name}: "I wanted to check in about how I'm doing and what I need to do to move up."`;
 showModal("Manager Office — Employee Conversation",`<div class="office-convo">${issue}</div><p>${e.role} • ${e.years} years • ${money(e.pay)}/hr • Attendance ${e.attendance}%</p>
 <div class="walkaround-actions"><button onclick="employeeDecision('${e.name}','raise')">Approve $1 Raise</button><button onclick="employeeDecision('${e.name}','development')">Development Plan</button><button onclick="employeeDecision('${e.name}','decline')">Decline Request</button></div>`)
}
window.employeeDecision=(name,decision)=>{let e=state.employees.find(x=>x.name===name);if(!e)return;if(decision==="raise"){e.pay+=1;e.history.unshift(`${state.date.toLocaleDateString()}: $1.00 raise approved.`)}if(decision==="development")e.history.unshift(`${state.date.toLocaleDateString()}: Development plan started.`);if(decision==="decline")e.history.unshift(`${state.date.toLocaleDateString()}: Pay/promotion request declined.`);$("#modal").close();render()}

function careerCheck(){
 state.career.xp+=Math.max(0,Math.round((state.satisfaction-75)/5));
 if(state.dailyHistory.length>=5&&state.career.xp>=60){state.internalJobs.forEach(j=>j.status="Available")}
}

function plannerHours(){
 let rows=[];
 for(let h=7;h<=19;h++){
   const start=h*60,end=start+59;
   const pickups=state.reservations.filter(r=>r.pickup>=start&&r.pickup<=end);
   const returns=state.reservations.filter(r=>{let x=expectedReturnMinute(r);return x!==null&&x>=start&&x<=end});
   const staffing=state.employees.filter(e=>e.status==="Working" && employeeOnTask(e,h)).length;
   const cleaningCap=Math.max(1,state.employees.filter(e=>e.status==="Working"&&["Cleaning Bay","Returns"].includes(state.staffAssignments[e.name]||e.task)).length)*2;
   const classes=["Economy","Midsize","SUV","Minivan","Luxury"];
   let shortages=[];
   classes.forEach(cls=>{
     const due=state.reservations.filter(r=>["Booked","Waiting"].includes(r.status)&&r.class===cls&&r.pickup<=end).length;
     const avail=state.fleet.filter(v=>v.class===cls&&["Ready","Cleaning","Fueling","Returned"].includes(v.status)).length;
     const rentedBefore=state.reservations.filter(r=>r.status==="Out"&&r.class===cls&&(expectedReturnMinute(r)||9999)>end).length;
     const projected=avail-rentedBefore-due;
     if(projected<0)shortages.push(`${cls} ${projected}`);
   });
   rows.push({h,start,pickups,returns,staffing,cleaningCap,shortages});
 }
 return rows
}
function employeeOnTask(e,h){
 const task=state.staffAssignments[e.name]||e.task;
 if(e.status!=="Working")return false;
 if(h===12 && ["Counter","Cleaning Bay","Returns"].includes(task) && (e.name.charCodeAt(0)%2===0)) return false;
 return true
}
window.setStaffAssignment=(name,val)=>{
 state.staffAssignments[name]=val;
 const e=state.employees.find(x=>x.name===name);if(e)e.task=val;
 state.plannerNotes.unshift(`${fmtTime(state.minute)} — ${name} assigned to ${val}.`);
 render()
}
function projectedShortages(){
 const rows=plannerHours();const map={};
 rows.forEach(row=>row.shortages.forEach(s=>{const [cls,num]=s.split(" ");map[cls]=Math.min(map[cls]??0,Number(num))}));
 return map
}
window.requestPlannerTransfer=(cls)=>{
 const branch=state.branches.find(b=>b.name!=="Warsaw" && (b[classKey(cls)]||0)>0);
 if(!branch)return showModal("Transfer Request",`No nearby branch currently shows excess ${cls} inventory.`);
 branch[classKey(cls)]--;state.transfers.push({id:uid(),class:cls,from:branch.name,to:"Warsaw",eta:Math.min(1080,state.minute+90),status:"En Route"});
 state.expensesToday.transfers+=18;state.plannerNotes.unshift(`${fmtTime(state.minute)} — Requested ${cls} transfer from ${branch.name}; ETA about 90 minutes.`);
 showModal("Transfer Requested",`${branch.name} is sending one ${cls}. Estimated arrival: ${fmtTime(Math.min(1080,state.minute+90))}.`);render()
}
function processTransfers(){
 (state.transfers||[]).filter(t=>t.status==="En Route"&&t.eta<=state.minute).forEach(t=>{
   let v=state.fleet.find(v=>v.class===t.class&&v.status==="Transfer");
   if(!v){
     v=makeVehicle(state.fleet.length+1);v.class=t.class;v.model=t.class==="SUV"?"Chevrolet Equinox":t.class==="Minivan"?"Chrysler Pacifica":"Toyota Camry";v.status="Ready";v.unit=String(3000+state.fleet.length);state.fleet.push(v)
   }else{v.status="Ready"}
   v.keyLocation="Key Cabinet";addHistory(v,`Arrived from ${t.from} branch transfer.`);t.status="Arrived";
 })
}
function applyOperatingCosts(mins){
 const working=state.employees.filter(e=>e.status==="Working");
 const hourly=working.reduce((a,e)=>a+(e.pay||19),0);
 const labor=(hourly/60)*mins;
 state.laborToday+=labor;state.expensesToday.labor+=labor;
 const cleaning=state.fleet.filter(v=>v.status==="Cleaning").length*.06*mins;
 state.expensesToday.cleaning+=cleaning;
}
function autoSnapshot(reason="Auto"){
 try{
   const snap=JSON.stringify({...state,running:false,autoSaves:[]});
   state.autoSaves.unshift({time:new Date().toISOString(),gameDate:state.date.toISOString(),minute:state.minute,reason,data:snap});
   state.autoSaves=state.autoSaves.slice(0,5);
   localStorage.setItem("horizonRentalManager_autorecovery",JSON.stringify(state.autoSaves));
 }catch(e){console.warn("Autosave skipped",e)}
}
window.showRecovery=()=>{
 let snaps=state.autoSaves||[];if(!snaps.length){try{snaps=JSON.parse(localStorage.getItem("horizonRentalManager_autorecovery")||"[]")}catch(e){}}
 if(!snaps.length)return showModal("Recovery Snapshots","No automatic recovery snapshots are available yet.");state.autoSaves=snaps;
 showModal("Recovery Snapshots",snaps.map((s,i)=>`<p><b>${new Date(s.time).toLocaleString()}</b> — ${s.reason}<br>Game time ${fmtTime(s.minute)} <button onclick="restoreSnapshot(${i})">Restore</button></p>`).join(""))
}
window.restoreSnapshot=i=>{
 const snaps=state.autoSaves||[];if(!snaps[i])return;
 state=migrateState(JSON.parse(snaps[i].data));state.running=false;stopTimer();$("#modal").close();render()
}
function branchProfit(){
 const e=state.expensesToday||{};return state.revenueToday-Object.values(e).reduce((a,n)=>a+(Number(n)||0),0)
}

function generateMorningBoard(){
 const reservations=state.reservations.length, returns=Math.max(7,Math.floor(reservations*.65)), available=state.fleet.filter(v=>v.status!=="Rented").length;
 const byClass={};state.reservations.filter(r=>["Booked","Waiting"].includes(r.status)).forEach(r=>byClass[r.class]=(byClass[r.class]||0)+1);
 const readyBy={};ready().forEach(v=>readyBy[v.class]=(readyBy[v.class]||0)+1);
 const shortages=Object.entries(byClass).map(([k,n])=>[k,n-(readyBy[k]||0)]).filter(x=>x[1]>0);
 return {reservations,returns,available,shortages,dirty:state.fleet.filter(v=>v.status==="Cleaning").length,maint:state.fleet.filter(v=>v.status==="Maintenance").length,overdue:state.overdue.length}
}
window.showMorningBoard=()=>{
 const b=generateMorningBoard();
 showModal("Morning Fleet Meeting",`<div class="whiteboard"><h2>${state.date.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})} Fleet Plan</h2>
 <div class="board-grid">
 <div class="board-note"><b>Today's Business</b><h2>${b.reservations} reservations</h2>${b.returns} expected returns<br>${b.available} vehicles on/returning to lot</div>
 <div class="board-note"><b>Fleet Shortages</b><br>${b.shortages.length?b.shortages.map(x=>`<b>${x[0]}:</b> short ${x[1]}`).join("<br>"):"No projected class shortages"}</div>
 <div class="board-note"><b>Turnaround</b><br>${b.dirty} cleaning<br>${b.maint} maintenance<br>${b.overdue} overdue</div>
 <div class="board-note"><b>Staffing</b><br>${state.employees.filter(e=>e.status==="Working").length} working<br>${state.employees.filter(e=>e.status!=="Working").length} unavailable</div>
 <div class="board-note"><b>Other Branches</b><br>Fort Wayne Airport: ${state.branches[1].suv} SUVs excess<br>Columbia City: ${state.branches[2].minivan} minivans available</div>
 <div class="board-note"><b>Manager Focus</b><br>Protect ready-car rate<br>Keep wait under 10 min<br>Review extensions before approving</div>
 </div></div>`)
}
function addPhone(type,text,actions=[]){state.phoneQueue.push({id:uid(),type,text,actions,time:fmtTime(state.minute)});$("#officePhone")?.classList.add("phone-ringing")}
window.answerPhone=()=>{
 const call=state.phoneQueue[0];if(!call)return showModal("Manager Phone","No calls waiting.");
 let buttons=call.actions.map((a,i)=>`<button onclick="phoneAction(${i})">${a.label}</button>`).join("");
 $("#modalBody").innerHTML=`<h2>📞 ${call.type}</h2><p>${call.text}</p><div class="walkaround-actions">${buttons||'<button onclick="phoneAction(0)">Acknowledge</button>'}</div>`;$("#modal").showModal()
}
window.phoneAction=i=>{
 const call=state.phoneQueue.shift();if(!call)return;
 let a=call.actions[i];if(a&&a.fn==="extend"){let r=state.reservations.find(x=>x.status==="Out");if(r){r.days+=2;state.revenueToday+=r.rate*2;state.overdue=state.overdue.filter(x=>x!==r.id)}}
 if(a&&a.fn==="deny")state.satisfaction=Math.max(0,state.satisfaction-1);
 if(a&&a.fn==="transfer"){let v=ready().find(x=>x.class==="SUV")||ready()[0];if(v){v.status="Transfer";v.keyLocation="Derek Sims";addHistory(v,"Assigned to branch transfer.")}}
 $("#modal").close();if(!state.phoneQueue.length)$("#officePhone")?.classList.remove("phone-ringing");render()
}
function autonomousStaff(){
 // Agents serve simple customers occasionally, but never steal selected/current customer.
 if(state.minute%15===0){
   let agent=state.employees.find(e=>e.status==="Working"&&e.auto&&e.role==="Rental Agent"&&(state.staffAssignments[e.name]||e.task)==="Counter");
   let r=waiting().find(x=>x.id!==state.selectedReservation);
   if(agent&&r){
     let v=ready().find(x=>x.class===r.class);
     if(v){r.idVerified=true;r.paymentVerified=true;r.assignedVehicle=v.id;r.status="Out";v.status="Rented";v.assignedRental=r.id;v.keyLocation="Customer";state.rentalsToday++;state.revenueToday+=r.rate;addHistory(v,`${agent.name} completed counter rental for ${r.customer.name}.`)}
   }
 }
 // Service agent moves returns to cleaning
 if(state.minute%10===0){
   let svc=state.employees.find(e=>e.role==="Service Agent"&&e.status==="Working"&&["Returns","Cleaning Bay"].includes(state.staffAssignments[e.name]||e.task));
   let v=state.fleet.find(x=>x.status==="Returned");
   if(svc&&v){v.status="Cleaning";v.cleanRemaining=Math.floor(12+Math.random()*25);v.keyLocation="Cleaning Bay";if(!state.cleaningQueue.includes(v.id)&&!state.cleaningBays.includes(v.id))state.cleaningQueue.push(v.id);fillCleaningBays()}
 }
}
function operationalEvents(){
 if(state.minute%60!==0)return;
 let roll=Math.random();
 if(roll<.15){
   let r=state.reservations.find(x=>x.status==="Out");
   if(r)addPhone("Rental Extension",`${r.customer.name} wants to keep Unit ${state.fleet.find(v=>v.id===r.assignedVehicle)?.unit||""} for two more days.`,[{label:"Approve extension",fn:"extend"},{label:"Decline — vehicle needed",fn:"deny"}])
 } else if(roll<.27){
   addPhone("Insurance Rental","Northern Indiana Insurance needs an immediate replacement rental for a customer whose vehicle is at a body shop.",[{label:"Accept referral",fn:"accept"},{label:"Decline",fn:"deny"}])
 } else if(roll<.38){
   addPhone("Branch Transfer Request","Fort Wayne Airport is requesting one SUV for tonight's reservations.",[{label:"Send a vehicle",fn:"transfer"},{label:"Keep our fleet",fn:"deny"}])
 } else if(roll<.47){
   let v=state.fleet.find(x=>x.status==="Rented");if(v)addPhone("Roadside Assistance",`Customer in Unit ${v.unit} reports a warning light and asks what to do.`,[{label:"Authorize roadside",fn:"roadside"},{label:"Arrange swap",fn:"swap"}])
 } else if(roll<.54){
   let v=state.fleet.find(x=>x.status==="Rented");
   if(v && Math.random()<.5){state.oneWays.push({id:uid(),vehicleId:v.id,to:"Fort Wayne Airport",status:"Expected"});state.plannerNotes.unshift(`${fmtTime(state.minute)} — One-way return reported for Unit ${v.unit}; it will not return to Warsaw today.`)}
 } else if(roll<.62){
   state.managerInbox.unshift("Area Manager plans a branch visit this week. Review lot appearance, ready rate, sales, and customer wait times.")
 }
 // calloff
 if(Math.random()<.05){let e=pick(state.employees.filter(x=>x.status==="Working"));if(e){e.status="Called Off";e.history.unshift(`Called off ${state.date.toLocaleDateString()}`);state.managerInbox.unshift(`${e.name} called off today.`)}}
}
function endOfDayReport(){
 const b=generateMorningBoard();
 return `<h2>End-of-Day Close</h2><div class="card-grid">
 <div class="simple-card"><b>Rentals</b><h1>${state.rentalsToday}</h1></div>
 <div class="simple-card"><b>Revenue</b><h1>${money(state.revenueToday)}</h1></div>
 <div class="simple-card"><b>Satisfaction</b><h1>${state.satisfaction}%</h1></div>
 <div class="simple-card"><b>Ready for Tomorrow</b><h1>${ready().length}</h1></div>
 </div><p>${b.dirty} vehicles still cleaning • ${b.maint} maintenance • ${(state.phoneQueue||[]).length} unresolved phone calls.</p>
 <p><b>Operating costs:</b> ${money(Object.values(state.expensesToday||{}).reduce((a,n)=>a+(Number(n)||0),0))} &nbsp; <b>Branch profit:</b> ${money(branchProfit())}</p>`
}

function renderOtherScreens(){
 try {
 $("#dashboardContent").innerHTML=`<h2>Branch Dashboard</h2><div class="card-grid"><div class="simple-card"><b>Fleet Utilization</b><h1>${utilization()}%</h1></div><div class="simple-card"><b>Customer Satisfaction</b><h1>${state.satisfaction}%</h1></div><div class="simple-card"><b>Ready Vehicles</b><h1>${ready().length}</h1></div><div class="simple-card"><b>Queue</b><h1>${waiting().length}</h1></div><div class="simple-card"><b>Exact-Class Fulfillment</b><h1>${satisfactionStats().exact}%</h1></div></div>`;
 $("#reservationContent").innerHTML=`<h2>Reservations</h2><table class="data-table"><thead><tr><th>Time</th><th>Customer</th><th>Class</th><th>Days</th><th>Status</th><th>Assigned</th></tr></thead><tbody>${state.reservations.map(r=>`<tr><td>${fmtTime(r.pickup)}</td><td>${r.customer.name}</td><td>${r.class}</td><td>${r.days}</td><td>${r.status}</td><td>${r.assignedVehicle?state.fleet.find(v=>v.id===r.assignedVehicle)?.unit:""}</td></tr>`).join("")}</tbody></table>`;
 $("#fleetContent").innerHTML=`<h2>Fleet</h2><table class="data-table"><thead><tr><th>Unit</th><th>Vehicle</th><th>Class</th><th>Miles</th><th>Fuel</th><th>Status</th></tr></thead><tbody>${state.fleet.map(v=>`<tr onclick="vehicleDetails('${v.id}')"><td>${v.unit}</td><td>${v.model}</td><td>${v.class}</td><td>${v.miles.toLocaleString()}</td><td>${v.fuel}/8</td><td>${v.status}</td></tr>`).join("")}</tbody></table>`;
 $("#employeeContent").innerHTML=`<h2>Employees</h2><div class="card-grid">${state.employees.map(e=>`<div class="simple-card"><h3>${e.name} ${e.auto?'<span class="employee-auto">AUTO</span>':''}</h3><b>${e.role}</b><p>${e.status} • ${e.task}</p><p>Sales ${e.sales}% • Service ${e.service}%</p><p>${e.years||0} years • ${money(e.pay||0)}/hr • Attendance ${e.attendance||90}%</p><small>${(e.history||[]).slice(0,3).join("<br>")}</small><br><button onclick="employeeOffice(\'${e.name}\')">Meet in Office</button></div>`).join("")}</div>`;
 $("#maintenanceContent").innerHTML=`<h2>Maintenance & Turnaround</h2><div class="card-grid"><div class="simple-card"><b>Cleaning</b><h1>${state.fleet.filter(v=>v.status==="Cleaning").length}</h1></div><div class="simple-card"><b>Fueling</b><h1>${state.fleet.filter(v=>v.status==="Fueling").length}</h1></div><div class="simple-card"><b>Maintenance</b><h1>${state.fleet.filter(v=>v.status==="Maintenance").length}</h1></div><div class="simple-card"><b>Return Lane</b><h1>${state.fleet.filter(v=>v.status==="Returned").length}</h1></div></div>`;
 $("#reportsContent").innerHTML=`<h2>Reports & Profitability</h2>
 <div class="finance-grid">
 <div class="simple-card"><b>Revenue</b><h1>${money(state.revenueToday)}</h1></div>
 <div class="simple-card"><b>Operating Costs</b><h1>${money(Object.values(state.expensesToday||{}).reduce((a,n)=>a+(Number(n)||0),0))}</h1></div>
 <div class="simple-card"><b>Branch Profit</b><h1>${money(branchProfit())}</h1></div>
 <div class="simple-card"><b>Utilization</b><h1>${utilization()}%</h1></div>
 </div>
 <h3>Customer Experience</h3>
 ${(()=>{const x=satisfactionStats();return `<div class="metric-grid"><div class="simple-card"><b>Customer Satisfaction</b><h1>${x.avg}%</h1></div><div class="simple-card"><b>Exact-Class Fulfillment</b><h1>${x.exact}%</h1></div><div class="simple-card"><b>Avg. Counter Wait</b><h1>${x.wait} min</h1></div><div class="simple-card"><b>Vehicle Complaints</b><h1>${x.complaints}</h1></div></div>`})()}
 <h3>Recent Customer Reviews</h3>${state.customerReviews.slice(0,8).map(rv=>`<div class="review-card"><span class="review-stars">${"★".repeat(rv.stars)}${"☆".repeat(5-rv.stars)}</span> <b>${rv.customer}</b><p>${rv.text}</p></div>`).join("")||"<p>No completed rental reviews yet.</p>"}
 <h3>Today's Cost Breakdown</h3>
 <table class="data-table"><tbody>${Object.entries(state.expensesToday||{}).map(([k,v])=>`<tr><td>${k[0].toUpperCase()+k.slice(1)}</td><td>${money(v)}</td></tr>`).join("")}</tbody></table>
 <h3>Recent Daily History</h3><table class="data-table"><thead><tr><th>Date</th><th>Rentals</th><th>Revenue</th><th>Profit</th><th>Sat.</th><th>Util.</th></tr></thead>
 <tbody>${(state.dailyHistory||[]).slice(0,14).map(d=>`<tr><td>${new Date(d.date).toLocaleDateString()}</td><td>${d.rentals}</td><td>${money(d.revenue)}</td><td>${money(d.profit)}</td><td>${d.satisfaction}%</td><td>${d.utilization}%</td></tr>`).join("")||"<tr><td colspan='6'>Complete a day to build history.</td></tr>"}</tbody></table>`;
 

 const waitingVisitor=state.managerVisitors.find(x=>x.status==="Waiting");
 $("#officeContent").innerHTML=`<h2>Branch Manager Office</h2><div class="next-step"><strong>OFFICE IS LIVE:</strong> Use the computer, phone, inbox, whiteboard, window, or calendar below.</div>${waitingVisitor?`<div class="knock"><b>Knock at the door — ${waitingVisitor.employee}</b><br>${waitingVisitor.reason}<br><button onclick="handleVisitor('${waitingVisitor.id}')">Talk to Employee</button></div>`:""}
 <div class="office-room">
 <div class="office-object" onclick="officeAction('computer')"><h3>🖥 Manager Computer</h3>Daily planner, staffing, reports and fleet forecast.</div>
 <div class="office-object" onclick="officeAction('phone')"><h3>☎ Office Phone</h3>${state.phoneQueue.length} calls waiting. Roadside, branches and customers.</div>
 <div class="office-object" onclick="officeAction('inbox')"><h3>▤ Inbox</h3>${state.managerInbox.length} messages and corporate notices.</div>
 <div class="office-object" onclick="officeAction('whiteboard')"><h3>□ Morning Whiteboard</h3>Today's fleet plan, shortages and priorities.</div>
 <div class="office-object" onclick="officeAction('window')"><h3>▦ Office Window</h3>Look directly onto the physical parking lot.</div>
 <div class="office-object" onclick="officeAction('calendar')"><h3>◷ Calendar</h3>Future reservations, returns and staffing.</div></div>
 <h3>Roadside / Active Events</h3>${state.roadsideCases.filter(x=>x.status==="Open").map(c=>{let v=state.fleet.find(x=>x.id===c.vehicleId);return `<div class="event-card roadside-card"><b>Roadside — Unit ${v?.unit||"?"}</b><br>${c.problem} • ${c.distance} miles away <button onclick="openRoadside('${c.id}')">Handle</button></div>`}).join("")||"<p>No open roadside cases.</p>"}
 ${state.rareEvents.filter(x=>x.status==="Active").map(e=>`<div class="event-card"><b>${e.type}</b><br>${e.text}<br><button onclick="resolveRareEvent('${e.id}')">Acknowledge</button></div>`).join("")}`;
 syncParking();
 $("#lotContent").innerHTML=`<h2>Physical Branch Lot</h2><p>Every in-branch vehicle now occupies a real space. Click a vehicle for its profile or an empty space to move a vehicle.</p>
 <div class="lot-map">${state.parkingSpaces.map(s=>{let v=s.vehicleId?state.fleet.find(x=>x.id===s.vehicleId):null;return `<div class="parking-space ${s.zone.toLowerCase()} ${v?"":"empty"}" onclick="openParkingSpace('${s.id}')"><div class="space-label">${s.id} • ${s.zone}</div>${v?`<div class="vehicle-mini">🚗 ${v.unit}<br>${v.model}<br>${v.status}</div>`:"EMPTY"}</div>`}).join("")}</div>
 <h3>New Fleet Intake</h3>${state.fleetDeliveries.filter(d=>d.status==="Awaiting Intake").map(d=>`<div class="payment-card"><b>Unit ${d.unit}</b> — ${d.model} <button onclick="intakeFleet('${d.id}')">Inspect / Plate / Fuel / Stage</button></div>`).join("")||"<p>No transporter deliveries waiting.</p>"}`;
 ensureCustomerProfiles();
 $("#customersContent").innerHTML=`<h2>Customer CRM</h2><div class="customer-grid">${state.customerProfiles.map(p=>`<div class="customer-card ${p.loyalty==="Emerald Elite"?"vip":""}">
 <h3>${p.name} ${p.dnr?'<span class="dnr-badge">DNR</span>':p.loyalty!=="None"?`<span class="loyalty-badge">${p.loyalty}</span>`:""}</h3>
 <p>${p.favoriteClass} • ${p.rentals+rentalCount(p.id)} rentals<br>${money(p.lifetimeSpend)} lifetime spend<br>Avg satisfaction: ${p.satisfactionHistory?.length?Math.round(p.satisfactionHistory.reduce((a,n)=>a+n,0)/p.satisfactionHistory.length)+"%":"—"}</p>
 <p>${p.preferences.join(" • ")||"No saved preferences"}</p><button onclick="openCustomerProfile('${p.id}')">Open Profile</button></div>`).join("")}</div>`;
 $("#agreementsContent").innerHTML=`<h2>Rental Agreements</h2><table class="history-table"><thead><tr><th>Agreement</th><th>Customer</th><th>Vehicle</th><th>Status</th><th>Daily</th><th>Payment</th></tr></thead><tbody>
 ${state.contracts.map(c=>`<tr><td>${c.number}</td><td>${c.customer}</td><td>${c.vehicle}</td><td>${c.status}</td><td>${money(c.daily||0)}</td><td>${c.status==="Closed"?"Finalized":"Authorized"}</td></tr>`).join("")||"<tr><td colspan='6'>No agreements yet.</td></tr>"}</tbody></table>
 <h3>Recent Payment Activity</h3>${state.paymentEvents.slice(0,10).map(p=>`<div class="payment-card"><b>${p.customer}</b> — ${money(p.amount)} — ${p.status}</div>`).join("")||"<p>No payment activity yet.</p>"}`;

  const prow=plannerHours(), ps=projectedShortages();
 $("#plannerContent").innerHTML=`<h2>Daily Planner — ${state.date.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})}</h2>
 <div class="planner-top">
  <div class="planner-kpi"><span>Pickups Today</span><b>${state.reservations.length}</b></div>
  <div class="planner-kpi"><span>Projected Shortages</span><b>${Object.keys(ps).length}</b></div>
  <div class="planner-kpi"><span>Cleaning Capacity</span><b>${state.employees.filter(e=>e.status==="Working"&&(state.staffAssignments[e.name]||e.task)==="Cleaning Bay").length*2}/hr</b></div>
  <div class="planner-kpi"><span>Projected Profit</span><b>${money(branchProfit())}</b></div>
 </div>
 <div class="forecast-strip">${["Economy","Midsize","SUV","Minivan","Luxury"].map(c=>{let n=ps[c]||0;return `<div class="forecast-box ${n<0?"bad":"good"}"><b>${c}</b><br>${n<0?`Short ${Math.abs(n)}`:"Covered"} ${n<0?`<br><button onclick="requestPlannerTransfer('${c}')">Request Transfer</button>`:""}</div>`}).join("")}</div>
 <h3>Hourly Operations Timeline</h3>
 <div class="timeline"><div class="timeline-head"><div>Time</div><div>Pickups</div><div>Returns</div><div>Staff / Cleaning</div><div>Forecast</div></div>
 ${prow.map(row=>`<div class="timeline-row ${row.shortages.length?"shortage":state.minute>=row.start&&state.minute<row.start+60?"now":""}">
 <div><b>${fmtTime(row.start)}</b></div>
 <div>${row.pickups.length?row.pickups.map(r=>`<span class="pill">${r.customer.name}<br>${r.class}</span>`).join(""):"—"}</div>
 <div>${row.returns.length?row.returns.map(r=>`<span class="pill green">${r.customer.name}<br>${r.class}</span>`).join(""):"—"}</div>
 <div>${row.staffing} working<br>${row.cleaningCap} clean/hr</div>
 <div>${row.shortages.length?row.shortages.map(s=>`<span class="pill red">${s}</span>`).join(""):`<span class="pill green">Covered</span>`}</div>
 </div>`).join("")}</div>
 <h3>Staff Assignment Board</h3><div class="staff-board">${state.employees.map(e=>`<div class="staff-card"><b>${e.name}</b><br>${e.role} • ${e.status}
 <select onchange="setStaffAssignment('${e.name.replace(/'/g,"\\'")}',this.value)">
 ${["Counter","Returns","Cleaning Bay","Fueling/Transfers","Pickup/Delivery","Maintenance Runner","Manager Office"].map(t=>`<option ${((state.staffAssignments[e.name]||e.task)===t)?"selected":""}>${t}</option>`).join("")}
 </select></div>`).join("")}</div>
 <p><button onclick="showRecovery()">Recovery Snapshots</button></p>`;

 $("#operationsContent").innerHTML=`<h2>Live Branch Operations</h2><div class="ops-grid">
 <div class="ops-card"><h3>📞 Manager Phone</h3><div class="big">${(state.phoneQueue||[]).length}</div><p>calls waiting</p><button onclick="answerPhone()">Answer Next Call</button></div>
 <div class="ops-card"><h3>🚫 Do Not Rent</h3><div class="big">${(state.dnr||[]).length}</div><p>customers on branch risk list</p></div>
 <div class="ops-card"><h3>⏰ Overdue</h3><div class="big">${(state.overdue||[]).length}</div><p>active overdue rentals</p></div>
 <div class="ops-card"><h3>🏢 Accounts</h3>${(state.accounts||[]).map(a=>`<p><b>${a.name}</b><br>${a.type} • Relationship ${a.relationship}% • ${a.rentals} rentals</p>`).join("")}</div>
 <div class="ops-card"><h3>🔑 Key Control</h3>${["Key Cabinet","Customer","Cleaning Bay","Maintenance","Manager/Customer"].map(k=>`<p>${k}: <b>${state.fleet.filter(v=>(v.keyLocation||"Key Cabinet")===k).length}</b></p>`).join("")}</div>
 <div class="ops-card"><h3>Other Branches</h3><p>Branch relationships affect how willing managers are to help with fleet.</p>${(state.branches||[]).map(b=>`<p><b>${b.name}</b> ${b.distance?b.distance+" mi":""}<br>SUV ${b.suv} • Minivan ${b.minivan} • Economy ${b.economy}</p>`).join("")}</div>
 </div>`;
 $("#corporateContent").innerHTML=`<h2>Corporate Scorecard</h2><div class="card-grid"><div class="simple-card"><b>Utilization Target</b><h1>78%</h1><p>Current ${utilization()}%</p></div><div class="simple-card"><b>Customer Satisfaction</b><h1>90%</h1><p>Current ${state.satisfaction}%</p></div><div class="simple-card"><b>Branch Status</b><h1>${state.branchStatus}</h1></div><div class="simple-card"><b>Career</b><h1>${(state.career||{title:"Branch Manager"}).title}</h1><p>XP ${(state.career||{xp:0}).xp} • Next: ${(state.career||{next:"Area Manager"}).next}</p>${state.internalJobs.map(j=>`<p><b>${j.title}</b><br>Fleet ${j.fleet} • ${j.employees} employees • ${money(j.annualRevenue)} annual revenue<br><span class="pill ${j.status==="Available"?"green":"orange"}">${j.status}</span></p>`).join("")}</div></div>`;
 if(state.areaMode) $("#corporateContent").innerHTML+=`<h2>Northeast Indiana Region</h2><div class="branch-network">${state.managedBranches.map((name,i)=>`<div class="branch-node"><h3>${name}</h3><p>Branch Manager: ${state.branchRelationships[name]?.manager||"Assigned Manager"}<br>Fleet: ${Math.floor(55+Math.random()*130)}<br>Satisfaction: ${Math.floor(76+Math.random()*20)}%<br>Relationship: ${state.branchRelationships[name]?.score||65}/100</p><button onclick="callBranch('${name}')">Call Branch Manager</button></div>`).join("")}</div>`;
 else if(areaManagerEligible()) $("#corporateContent").innerHTML+=`<div class="simple-card"><h3>Promotion Opportunity</h3><b>Area Manager — Northeast Indiana</b><p>Warsaw • Columbia City • Goshen • Fort Wayne Airport • Fort Wayne Downtown</p><button onclick="acceptAreaRole()">Accept Promotion</button></div>`;
 } catch(err) {
   console.error("Secondary screen render error:",err);
   const ops=$("#operationsContent");
   if(ops) ops.innerHTML=`<h2>Live Branch Operations</h2><div class="ops-card"><h3>Operations Recovery</h3><p>The game repaired missing data from an older save. Reload this screen once. If this message remains, start a new v0.10.0 game.</p><pre>${String(err.message||err)}</pre></div>`;
 }

}
function showModal(title,body){$("#modalBody").innerHTML=`<h2>${title}</h2><div>${body}</div>`;$("#modal").showModal()}
$$(".nav-btn").forEach(b=>b.onclick=()=>{
 $$(".nav-btn").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");
 $$(".screen").forEach(s=>s.classList.remove("active"));
 const target=$("#screen-"+b.dataset.screen);
 if(target)target.classList.add("active");
 safeRender("secondary screens",renderOtherScreens);
});
$$(".facility-tab").forEach(b=>b.onclick=()=>{
 $$(".facility-tab").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");
 const zone=b.dataset.zone;
 if(zone==="cleaning")showModal("Cleaning Bay",`${state.fleet.filter(v=>v.status==="Cleaning").length} vehicles are currently in cleaning. Cars wait in queue until one of six numbered bays is available.`);
 if(zone==="walkaround")openWalkaround();
 if(zone==="office"){
   const nav=$$(".nav-btn").find(x=>x.dataset.screen==="office");
   if(nav)nav.click();
 }
});

function stopTimer(){
 timerToken++;
 if(timer){clearTimeout(timer);timer=null}
 if(timerCountdown){clearInterval(timerCountdown);timerCountdown=null}
 nextTickAt=0;
 updateTimerStatus()
}
function speedConfig(){
 return {
   slow:{minutes:1,ms:60000,label:"Slow"},
   normal:{minutes:1,ms:30000,label:"Normal"},
   fast:{minutes:1,ms:10000,label:"Fast"}
 }[state.simSpeed]||{minutes:1,ms:60000,label:"Slow"}
}
function updateTimerStatus(){
 const el=$("#timerStatus");if(!el)return;
 if(!state.running){el.textContent="PAUSED — game clock is not advancing";return}
 const s=speedConfig();
 const remain=Math.max(0,Math.ceil((nextTickAt-Date.now())/1000));
 el.textContent=`${s.label}: next game minute in ${remain}s`;
}
function scheduleNextTick(token){
 if(!state.running||token!==timerToken)return;
 const s=speedConfig();
 nextTickAt=Date.now()+s.ms;
 updateTimerStatus();
 timer=setTimeout(()=>{
   if(!state.running||token!==timerToken)return;
   tick(s.minutes);
   scheduleNextTick(token);
 },s.ms)
}
function startTimer(){
 stopTimer();
 state.running=true;
 const token=++timerToken;
 scheduleNextTick(token);
 timerCountdown=setInterval(updateTimerStatus,1000)
}


/* v0.10.0 checkout controller — reservation promise and satisfaction aware */
window.selectVehicle=id=>window.handleVehiclePromise(id);

window.showCheckoutCoverage=(r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle))=>{
 if(!r||!v)return;
 const req=customerCoverageRequest(r);
 r.checkoutStage="coverage";
 renderCustomer();
 showModal("Customer Coverage Choice",`
   <div class="selected-vehicle-banner"><b>Selected Vehicle:</b> Unit ${v.unit} — ${v.model}</div>
   <div class="office-convo"><b>${r.customer.name} says:</b><br><br>"${req.text}"</div>
   <div class="next-step"><strong>NEXT:</strong> Accept what the customer asked for and go directly to the rental agreement.</div>
   <button class="primary" onclick="acceptCoverageAndOpenAgreement()">Accept Coverage & Open Rental Agreement →</button>
   <button onclick="openProtection('${r.id}')">Change Coverage</button>
 `)
};

window.acceptCoverageAndOpenAgreement=()=>{
 const r=selected();if(!r)return;
 const req=customerCoverageRequest(r);
 r.products={...req.products};
 r.protectionDecision=req.type==="none"?"Declined":"Customer Selected";
 r.coverageConfirmed=true;
 r.checkoutStage="agreement";
 render();
 const d=$("#modal"); if(d?.open)d.close();
 setTimeout(()=>window.openAgreementPreview(),80);
};

window.askCustomerCoverage=()=>{
 const r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle);
 if(!r)return;
 const req=customerCoverageRequest(r);
 r.checkoutStage="coverage";
 render();
 if(v)return showCheckoutCoverage(r,v);
 showModal("Customer Coverage Choice",`<div class="office-convo"><b>${r.customer.name} says:</b><br><br>"${req.text}"</div><p>Select a vehicle and this choice will carry into the rental agreement.</p>`);
};

window.deepProtection=()=>window.askCustomerCoverage();

const _legacyOpenProtection=window.openProtection;
window.openProtection=id=>{
 const r=state.reservations.find(x=>x.id===id)||selected();if(!r)return;
 // If this is the first protection discussion, make the customer state a preference first.
 if(!r.customerCoverageRequest){
   r.customerCoverageRequest=null;
   customerCoverageRequest(r);
 }
 const req=r.customerCoverageRequest;
 $("#modalBody").innerHTML=`<h2>Coverage Requested by ${r.customer.name}</h2>
 <div class="office-convo"><b>${r.customer.name} says:</b><br><br>"${req.text}"</div>
 <p>Adjust the customer's choices if they ask for a change.</p>
 <div class="protection-choice"><label><input type="checkbox" id="mDamage" ${req.products.damage?"checked":""}> Damage Waiver (LDW)</label><b>$24.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mLiability" ${req.products.liability?"checked":""}> Supplemental Liability</label><b>$14.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mRoadside" ${req.products.roadside?"checked":""}> Roadside Assistance</label><b>$6.99/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mFuel" ${req.products.fuel?"checked":""}> Prepaid Fuel</label><b>$64.99</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mDriver" ${req.products.driver?"checked":""}> Additional Driver</label><b>$7.00/day</b></div>
 <div class="protection-choice"><label><input type="checkbox" id="mSeat" ${req.products.seat?"checked":""}> Child Seat</label><b>$13.00/day</b></div>
 <div class="action-row" style="margin-top:12px"><button class="primary" id="saveProtectionBtn">Save Coverage${state.selectedVehicle?" & Open Agreement →":""}</button><button id="declineProtectionBtn">Decline All</button></div>`;
 $("#modal").showModal();
 setTimeout(()=>{
   $("#saveProtectionBtn").onclick=()=>{
     r.products={damage:$("#mDamage").checked,liability:$("#mLiability").checked,roadside:$("#mRoadside").checked,fuel:$("#mFuel").checked,driver:$("#mDriver").checked,seat:$("#mSeat").checked};
     r.coverageConfirmed=true;r.checkoutStage=state.selectedVehicle?"agreement":"vehicle";
     $("#modal").close();render();
     if(state.selectedVehicle)setTimeout(()=>window.openAgreementPreview(),80);
   };
   $("#declineProtectionBtn").onclick=()=>{
     r.products={damage:false,liability:false,roadside:false,fuel:false,driver:false,seat:false};
     r.coverageConfirmed=true;r.protectionDecision="Declined";r.checkoutStage=state.selectedVehicle?"agreement":"vehicle";
     $("#modal").close();render();
     if(state.selectedVehicle)setTimeout(()=>window.openAgreementPreview(),80);
   };
 },0)
};

window.beginCheckoutFlow=()=>{
 const r=selected(),v=state.fleet.find(x=>x.id===state.selectedVehicle);
 if(!r||!v)return showModal("Checkout","Select a customer and vehicle first.");
 if(!r.coverageConfirmed)return showCheckoutCoverage(r,v);
 return window.openAgreementPreview();
};

$("#morningBoardBtn").onclick=showMorningBoard;
$("#playBtn").onclick=()=>{
 if(state.running){state.running=false;stopTimer()}
 else{startTimer()}
 render()
};
$("#advance5Btn").onclick=()=>tick(5);
$("#advance15Btn").onclick=()=>tick(15);
$("#speedSelect").value=state.simSpeed||"slow";
$("#speedSelect").onchange=()=>{state.simSpeed=$("#speedSelect").value;if(state.running)startTimer();else updateTimerStatus()};
$("#nextDayBtn").onclick=()=>{state.running=false;stopTimer();nextDay()};
$("#saveBtn").onclick=()=>{localStorage.setItem(SAVE_KEY,JSON.stringify({...state,date:state.date.toISOString()}));showModal("Game Saved","Your branch was saved in this browser.")};
$("#loadBtn").onclick=()=>{let raw=localStorage.getItem(SAVE_KEY)
 ||localStorage.getItem("horizonRentalManager_v094")
 ||localStorage.getItem("horizonRentalManager_v093")
 ||localStorage.getItem("horizonRentalManager_v092")
 ||localStorage.getItem("horizonRentalManager_v091")
 ||localStorage.getItem("horizonRentalManager_v090")
 ||localStorage.getItem("horizonRentalManager_v080")
 ||localStorage.getItem("horizonRentalManager_v070")
 ||localStorage.getItem("horizonRentalManager_v062")
 ||localStorage.getItem("horizonRentalManager_v061")
 ||localStorage.getItem("horizonRentalManager_v060")
 ||localStorage.getItem("horizonRentalManager_v051")
 ||localStorage.getItem("horizonRentalManager_v050")
 ||localStorage.getItem("horizonRentalManager_v041")
 ||localStorage.getItem("horizonRentalManager_v040");
 if(!raw)return showModal("Load Game","No compatible Horizon Rental Manager save was found.");state=migrateState(JSON.parse(raw));state.running=false;stopTimer();render();showModal("Game Loaded","Your branch save has been upgraded and restored for v0.10.0.")};
$("#confirmAssignmentBtn").onclick=()=>{if(state.selectedVehicle)beginCheckoutFlow()};
$("#viewInventoryBtn").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="fleet").click()};
$("#officePhone").onclick=answerPhone;
$("#officeInbox").onclick=()=>showModal("Manager Inbox","Regional utilization target is 78%. Keep ready-car availability high during peak arrivals.");
$("#officeStaff").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="employees").click()};
$("#officeReports").onclick=()=>{$$(".nav-btn").find(b=>b.dataset.screen==="reports").click()};
$("#editCustomerBtn").onclick=()=>showModal("Edit Rental","Customer profile and reservation modification controls will live here.");
["damage","liability","roadside","fuel","driver","seat"].forEach(k=>{let el=$("#product"+k[0].toUpperCase()+k.slice(1));el.onchange=()=>{let r=selected();if(r)gatherProducts(r)}})
window.addEventListener("keydown",e=>{if(e.code==="Space"&&!["INPUT","BUTTON"].includes(document.activeElement.tagName)){e.preventDefault();$("#playBtn").click()}if(e.key.toLowerCase()==="d")tick(15);
 if(e.key.toLowerCase()==="p"){let b=$$(".nav-btn").find(x=>x.dataset.screen==="planner");if(b)b.click()}});
render();