
const STORAGE_KEY="rentalCarManagerSave_v030";
const models=[
["2026 Chevrolet Equinox LT","SUV",26850],["2026 Toyota Camry LE","Full Size",25210],["2025 Toyota Corolla LE","Economy",22100],
["2026 Nissan Rogue SV","SUV",27500],["2025 Chevrolet Malibu","Midsize",23800],["2026 Ford Explorer XLT","Premium SUV",34600],
["2025 Chrysler Pacifica Touring","Minivan",33900],["2026 Ford Maverick XLT","Pickup",27100],["2025 Hyundai Elantra SEL","Economy",21800],
["2026 Kia K5 LXS","Midsize",24400],["2025 Jeep Grand Cherokee Laredo","SUV",32900],["2026 Chevrolet Traverse LT","Premium SUV",35200]];
const first=["Sarah","Mark","Emily","David","Jessica","Michael","Amanda","Chris","Ashley","Brian","Nicole","Kevin","Rachel","Jason","Jennifer","Daniel"];
const last=["Miller","Reynolds","Carter","Wilson","Brown","Davis","Martinez","Clark","Taylor","Anderson","Moore","Jackson","Collins","Harper"];
const classes=["Economy","Midsize","Full Size","SUV","Premium SUV","Minivan","Pickup"];
const branches=["Fort Wayne Airport","Fort Wayne Downtown","South Bend Airport","Indianapolis Airport"];
const rand=a=>a[Math.floor(Math.random()*a.length)];
const money=n=>n.toLocaleString(undefined,{style:"currency",currency:"USD",maximumFractionDigits:0});
const pad=n=>String(n).padStart(2,"0");
function fmtTime(min){let h=Math.floor(min/60)%24,m=min%60,ap=h>=12?"PM":"AM";return `${h%12||12}:${pad(m)} ${ap}`}
function fmtDate(d){return new Date(d).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}
function uid(){return crypto.randomUUID()}
function customer(){return{id:uid(),name:`${rand(first)} ${rand(last)}`,loyalty:Math.random()<.16?"Gold":Math.random()<.18?"Silver":"None",patience:Math.floor(55+Math.random()*45),visits:Math.floor(Math.random()*7),note:Math.random()<.35?rand(["Prefers SUVs","Needs child seat","Corporate traveler","Often arrives early","Prefers quick pickup","Uses debit card"]):"",rating:4.2+Math.random()*.7}}
function vehicle(i){
 let [model,cls,cost]=models[i%models.length], miles=Math.floor(7000+Math.random()*43000), unit=1800+i*17;
 return{id:uid(),unit,vin:`1RCM${String(unit).padStart(5,"0")}X${Math.floor(10000+Math.random()*89999)}`,plate:`IN ${Math.floor(1000+Math.random()*8999)}RC`,
 model,class:cls,year:+model.slice(0,4),mileage:miles,fuel:Math.floor(5+Math.random()*4)/8,cleanliness:Math.floor(72+Math.random()*29),
 tires:Math.floor(62+Math.random()*39),brakes:Math.floor(65+Math.random()*36),oilLife:Math.floor(45+Math.random()*56),condition:Math.floor(78+Math.random()*23),
 status:i<17?"Ready":i<20?"Cleaning":i<22?"Reserved":i<25?"Rented":"Maintenance",damage:[],history:[],
 revenue:Math.floor(2800+Math.random()*11500),acquiredCost:cost,acquiredDate:"2026-02-14",value:Math.floor(cost*.72),rentals:Math.floor(30+Math.random()*85),daysOut:0}
}
function employeeSet(){return[
{id:1,name:"Megan Harper",role:"Assistant Manager",skill:88,morale:86,attendance:96,wage:24.4,status:"Working",trait:"Calm under pressure",ambition:"Area management",schedule:["6:30-3","6:30-3","6:30-3","6:30-3","6:30-3","OFF","OFF"],task:"Counter support",sales:76,service:91,contracts:0,compliments:2,complaints:0},
{id:2,name:"Tyler Brooks",role:"Detailer",skill:78,morale:74,attendance:91,wage:17.8,status:"Working",trait:"Fast cleaner",ambition:"Full-time",schedule:["7-3:30","7-3:30","7-3:30","7-3:30","7-3:30","OFF","OFF"],task:"Vehicle turnaround",sales:20,service:82,contracts:0,compliments:1,complaints:0},
{id:3,name:"Jasmine Reed",role:"Rental Agent",skill:91,morale:89,attendance:98,wage:19.6,status:"Working",trait:"Excellent with customers",ambition:"Assistant Manager",schedule:["7-3:30","7-3:30","7-3:30","7-3:30","7-3:30","OFF","OFF"],task:"Counter",sales:88,service:94,contracts:0,compliments:4,complaints:0},
{id:4,name:"Carlos Vega",role:"Service Agent",skill:80,morale:81,attendance:94,wage:18.9,status:"Not Arrived",trait:"Good damage inspections",ambition:"Lead service",schedule:["8-4:30","8-4:30","8-4:30","8-4:30","8-4:30","OFF","OFF"],task:"Returns",sales:52,service:87,contracts:0,compliments:2,complaints:0},
{id:5,name:"Hannah Cole",role:"Rental Agent",skill:73,morale:77,attendance:88,wage:18.5,status:"Not Arrived",trait:"New employee",ambition:"Learn operations",schedule:["9-5:30","9-5:30","9-5:30","9-5:30","9-5:30","OFF","OFF"],task:"Counter",sales:69,service:80,contracts:0,compliments:1,complaints:1},
{id:6,name:"Derek Sims",role:"Driver",skill:84,morale:83,attendance:95,wage:18.2,status:"Not Arrived",trait:"Knows every local branch",ambition:"Fleet coordinator",schedule:["8-4:30","8-4:30","8-4:30","8-4:30","8-4:30","OFF","OFF"],task:"Transfers",sales:18,service:83,contracts:0,compliments:1,complaints:0}
]}
function reservations(){return Array.from({length:22},(_,i)=>{let c=customer(),pickup=430+i*23+Math.floor(Math.random()*12);return{id:uid(),customer:c,pickup,days:1+Math.floor(Math.random()*4),class:rand(classes),rate:Math.floor(48+Math.random()*88),status:i<2?"Waiting":"Booked",extras:Math.random()<.28?rand(["Child seat","Damage waiver","Prepaid fuel","Additional driver"]):"None",assignedVehicle:null}})}
function initialMarket(){return models.slice(0,8).map(([model,cls,cost],i)=>({id:uid(),model,class:cls,cost,qty:3+Math.floor(Math.random()*8),deliveryDays:2+Math.floor(Math.random()*9)}))}
function newGame(){
 let s={version:"0.3.0",date:new Date(2026,8,7),minute:405,running:false,cash:68000,revenueToday:0,expensesToday:0,satisfaction:91,reputation:4.4,utilization:0,
 fleet:Array.from({length:26},(_,i)=>vehicle(i)),employees:employeeSet(),reservations:reservations(),waiting:[],events:[],ledger:[],returns:[],cases:[],transfers:[],market:initialMarket(),
 career:{title:"Branch Manager",salary:58500,xp:0,next:"Senior Branch Manager"},weather:"Clear • 68°F",seasonDemand:1.0,
 corporate:{utilizationTarget:78,satisfactionTarget:90,laborTarget:12,damageRecoveryTarget:85,upsellTarget:42,readyRateTarget:88,score:82},
 contracts:[],reviews:[],branchStats:{protectionAttach:31,upgradeAttach:18,fuelAttach:12,readyRate:84,waitMinutes:7.8,nps:62,oneWays:0},
 inbox:[{from:"Regional Manager",subject:"September utilization target",body:"Regional target is 78%. Review aging fleet and reservation coverage."},
 {from:"Fleet Department",subject:"2027 model allocations",body:"Preliminary fleet allocations are now available in Fleet Market."}]};
 s.reservations.filter(r=>r.status==="Waiting").forEach(r=>s.waiting.push(r.id));
 s.fleet.forEach(v=>v.history.push({date:"Sep 7, 2026",text:"Vehicle entered active branch fleet."}));
 log(s,"Branch opened. Review reservations, returns, fleet readiness, and staffing.");
 return s
}
let state=newGame(),timer=null;
function log(s,text){s.events.unshift({time:fmtTime(s.minute),text});s.events=s.events.slice(0,120)}
function count(st){return state.fleet.filter(v=>v.status===st).length}
function util(){return Math.round(count("Rented")/state.fleet.length*100)}
function addHistory(v,text){v.history.unshift({date:fmtDate(state.date),text});v.history=v.history.slice(0,120)}
function damageEvent(v,severity="Minor"){
 const areas=["driver front door","passenger rear door","rear bumper","front bumper","windshield","left quarter panel","right mirror"];
 const types=severity==="Major"?["collision damage","large dent","cracked bumper"]:["scratch","door ding","windshield chip","scuff"];
 const d={id:uid(),date:fmtDate(state.date),area:rand(areas),type:rand(types),severity,cost:severity==="Major"?Math.floor(1200+Math.random()*3800):Math.floor(120+Math.random()*680),status:"Open",customerCharged:false};
 v.damage.push(d);addHistory(v,`DAMAGE: ${d.severity} ${d.type} on ${d.area}. Estimated ${money(d.cost)}.`);
 return d
}
function tick(minutes=5){
 state.minute+=minutes;if(state.minute>=1140){state.minute=1140;state.running=false;if(timer){clearInterval(timer);timer=null};log(state,"Branch closed for the day.");render();return}
 arrivals();employees();operations();randoms();render()
}
function arrivals(){
 state.reservations.forEach(r=>{if(r.status==="Booked"&&r.pickup<=state.minute){r.status="Waiting";state.waiting.push(r.id);log(state,`${r.customer.name} arrived for a ${r.class} reservation.`)}})
 const map={4:480,5:540};state.employees.forEach((e,i)=>{if(e.status==="Not Arrived"&&state.minute>=(map[i]||999)){e.status="Working";log(state,`${e.name} clocked in.`)}})
}
function employees(){
 if(state.minute%20<5){let cl=state.employees.find(e=>e.role==="Detailer"&&e.status==="Working"),car=state.fleet.find(v=>v.status==="Cleaning");if(cl&&car){car.cleanliness=Math.min(100,car.cleanliness+22);if(car.cleanliness>=95){car.status="Ready";car.fuel=Math.max(car.fuel,.75);addHistory(car,"Completed cleaning/fueling turnaround and returned to Ready.");log(state,`${cl.name} finished Unit ${car.unit}; it is Ready.`)}}}
}
function operations(){
 if(state.minute%45<5&&state.fleet.filter(v=>v.status==="Rented").length>5&&Math.random()<.42){
   let v=rand(state.fleet.filter(x=>x.status==="Rented"));v.status="Returned";v.mileage+=Math.floor(40+Math.random()*280);v.fuel=Math.floor(2+Math.random()*6)/8;v.cleanliness=Math.floor(40+Math.random()*45);
   let d=null;if(Math.random()<.18)d=damageEvent(v,Math.random()<.15?"Major":"Minor");
   state.returns.unshift({id:uid(),vehicleId:v.id,time:fmtTime(state.minute),inspected:false,damageId:d?d.id:null});
   closeContractForVehicle(v);addHistory(v,`Returned from rental at ${v.mileage.toLocaleString()} miles with ${Math.round(v.fuel*8)}/8 fuel.`);
   log(state,`Unit ${v.unit} returned${d?" with possible new damage":""}.`);
 }
 if(state.minute%60<5){state.fleet.filter(v=>v.status==="Rented").forEach(v=>{v.daysOut+=1/24;v.revenue+=Math.floor(2+Math.random()*5)})}
}
function randoms(){
 if(Math.random()<.022){
 const list=[
 ()=>{let v=rand(state.fleet.filter(x=>x.status==="Ready"));if(v){v.status="Maintenance";addHistory(v,"Warning light found during pre-rental check. Sent to maintenance.");log(state,`Unit ${v.unit} has a warning light and moved to Maintenance.`)}},
 ()=>{let c=customer();state.cases.unshift({id:uid(),customer:c.name,type:"Charge dispute",status:"Open"});state.inbox.unshift({from:c.name,subject:"Manager callback requested",body:"Customer disputes a recent rental charge."});log(state,`${c.name} requested a manager callback.`)},
 ()=>{let exp=40+Math.floor(Math.random()*100);state.cash-=exp;state.expensesToday+=exp;state.ledger.unshift({time:fmtTime(state.minute),desc:"Fuel / operating expense",amount:-exp});log(state,`Operating expense posted: ${money(exp)}.`)},
 ()=>{let v=rand(state.fleet.filter(x=>x.status==="Rented"));if(v){state.inbox.unshift({from:"Roadside Assistance",subject:`Unit ${v.unit} roadside call`,body:"Customer reports a warning light while driving. Review vehicle history and decide next steps."});addHistory(v,"Roadside assistance call reported while on rent.");log(state,`Roadside call received for Unit ${v.unit}.`)}},
 ()=>{state.satisfaction=Math.max(55,state.satisfaction-1);log(state,"Counter wait time increased; customer satisfaction slipped slightly.")},
 ()=>{let b=rand(branches);state.transfers.unshift({id:uid(),branch:b,class:rand(["SUV","Economy","Minivan"]),qty:1+Math.floor(Math.random()*3),urgent:Math.random()<.45,status:"Requested"});log(state,`${b} requested a fleet transfer.`)}
 ];rand(list)()
 }
}
function chooseVehicle(r,preferExact=true){
 let ready=state.fleet.filter(v=>v.status==="Ready");
 let exact=ready.find(v=>v.class===r.class);
 if(exact)return exact;
 const upgradeOrder=["Economy","Midsize","Full Size","SUV","Premium SUV","Minivan","Pickup"];
 let idx=upgradeOrder.indexOf(r.class);
 return ready.find(v=>upgradeOrder.indexOf(v.class)>idx)||ready[0]||null
}

function activeAgent(){
  return state.employees.filter(e=>e.status==="Working"&&["Rental Agent","Assistant Manager"].includes(e.role)).sort((a,b)=>b.skill-a.skill)[0]||state.employees[0]
}
function makeContract(r,v,upgrade,freeUpgrade){
  let agent=activeAgent();
  let protection=Math.random()<0.38;
  let fuelPlan=Math.random()<0.16;
  let roadside=Math.random()<0.22;
  let oneWay=Math.random()<0.12;
  let deposit=200;
  let baseRate=r.rate+(upgrade&&!freeUpgrade?18:0);
  let dailyExtras=(protection?24:0)+(fuelPlan?13:0)+(roadside?7:0);
  let totalDaily=baseRate+dailyExtras;
  let c={id:uid(),number:`RA-${String(260900+state.contracts.length+1)}`,reservationId:r.id,customerId:r.customer.id,customerName:r.customer.name,
    vehicleId:v.id,unit:v.unit,agent:agent.name,checkout:fmtDate(state.date)+" "+fmtTime(state.minute),days:r.days,
    rate:baseRate,protection,fuelPlan,roadside,oneWay,returnBranch:oneWay?rand(branches):"Warsaw Branch",
    mileageOut:v.mileage,fuelOut:Math.round(v.fuel*8)+"/8",deposit,status:"Open",walkaround:{front:"Clear",rear:"Clear",driver:"Clear",passenger:"Clear",interior:"Clear"},
    notes:[]};
  if(upgrade)c.notes.push(`Upgraded from ${r.class} to ${v.class}${freeUpgrade?" at no charge":""}.`);
  state.contracts.unshift(c);
  agent.contracts++;
  if(protection)state.branchStats.protectionAttach=Math.min(100,state.branchStats.protectionAttach+1);
  if(upgrade)state.branchStats.upgradeAttach=Math.min(100,state.branchStats.upgradeAttach+1);
  if(fuelPlan)state.branchStats.fuelAttach=Math.min(100,state.branchStats.fuelAttach+1);
  if(oneWay)state.branchStats.oneWays++;
  return {contract:c,totalDaily};
}
function generateReview(r,waitPenalty=0,upgrade=false){
  let rating=5;
  if(waitPenalty>12)rating--;
  if(waitPenalty>25)rating--;
  if(upgrade)rating=Math.min(5,rating+1);
  if(state.satisfaction<80)rating=Math.max(2,rating-1);
  let phrases=[];
  if(waitPenalty>20)phrases.push("The wait was longer than I expected");
  else phrases.push("Pickup was pretty smooth");
  if(upgrade)phrases.push("they upgraded me which helped a lot");
  if(state.branchStats.readyRate<80)phrases.push("the branch seemed short on ready cars");
  if(!phrases.length)phrases.push("staff was helpful");
  let text=phrases.join(", ")+"."; 
  state.reviews.unshift({id:uid(),date:fmtDate(state.date),customer:r.customer.name,rating,text});
  let avg=state.reviews.reduce((a,x)=>a+x.rating,0)/state.reviews.length;
  state.reputation=Math.max(1,Math.min(5,avg));
}
function closeContractForVehicle(v){
  let c=state.contracts.find(x=>x.vehicleId===v.id&&x.status==="Open");
  if(c){c.status="Returned";c.mileageIn=v.mileage;c.fuelIn=Math.round(v.fuel*8)+"/8";c.returnedAt=fmtDate(state.date)+" "+fmtTime(state.minute);
    addHistory(v,`Rental agreement ${c.number} closed. Mileage ${c.mileageOut.toLocaleString()} → ${c.mileageIn.toLocaleString()}.`);
  }
}

function serveReservation(id,freeUpgrade=false){
 let r=state.reservations.find(x=>x.id===id);if(!r)return;
 let v=chooseVehicle(r);if(!v){alert("No ready vehicles available.");return}
 let upgrade=v.class!==r.class;
 v.status="Rented";r.status="Out";r.assignedVehicle=v.id;state.waiting=state.waiting.filter(x=>x!==r.id);
 let wait=Math.max(0,state.minute-r.pickup);
 let pack=makeContract(r,v,upgrade,freeUpgrade);
 let revenue=pack.totalDaily;
 state.revenueToday+=revenue;state.cash+=revenue;state.ledger.unshift({time:fmtTime(state.minute),desc:`Rental ${pack.contract.number} – ${r.customer.name} / Unit ${v.unit}`,amount:revenue});
 v.rentals++;v.revenue+=revenue;addHistory(v,`Rented on agreement ${pack.contract.number} to ${r.customer.name} (${r.customer.loyalty}) for ${r.days} day(s).`);
 if(upgrade){log(state,`${r.customer.name} upgraded from ${r.class} to ${v.class}${freeUpgrade?" at no charge":""}.`);if(freeUpgrade)state.satisfaction=Math.min(100,state.satisfaction+1)}
 else log(state,`${r.customer.name} departed in Unit ${v.unit}.`);
 generateReview(r,wait,upgrade);
 state.branchStats.waitMinutes=Math.max(1,Math.round((state.branchStats.waitMinutes*4+wait)/5*10)/10);
 render()
}
function inspectReturn(returnId){
 let ret=state.returns.find(x=>x.id===returnId),v=state.fleet.find(x=>x.id===ret.vehicleId);ret.inspected=true;
 if(ret.damageId){v.status="DamageHold";addHistory(v,"Return inspection confirmed new damage; vehicle placed on Damage Hold.");}
 else{v.status="Cleaning";addHistory(v,"Return inspection completed: no new damage. Sent to cleaning.");}
 render()
}
function resolveDamage(vehicleId,damageId,charge){
 let v=state.fleet.find(x=>x.id===vehicleId),d=v.damage.find(x=>x.id===damageId);d.status="Resolved";d.customerCharged=charge;
 if(charge){state.cash+=d.cost;state.revenueToday+=d.cost;state.ledger.unshift({time:fmtTime(state.minute),desc:`Damage recovery – Unit ${v.unit}`,amount:d.cost});addHistory(v,`Damage claim recovered ${money(d.cost)} from renter.`)}
 else addHistory(v,`Damage charge waived; branch absorbed estimated ${money(d.cost)} repair.`);
 state.cash-=d.cost;state.expensesToday+=d.cost;state.ledger.unshift({time:fmtTime(state.minute),desc:`Damage repair – Unit ${v.unit}`,amount:-d.cost});
 v.status="Maintenance";addHistory(v,`Repair authorized for ${d.type} on ${d.area}.`);
 render()
}
function nextDay(){
 state.date.setDate(state.date.getDate()+1);state.minute=405;state.revenueToday=0;state.expensesToday=0;state.ledger=[];state.returns=[];state.weather=rand(["Clear • 67°F","Cloudy • 61°F","Rain • 58°F","Windy • 64°F","Sunny • 72°F"]);
 state.seasonDemand=1+(Math.random()*.2-.05);state.reservations=reservations();state.waiting=[];state.reservations.filter(r=>r.status==="Waiting").forEach(r=>state.waiting.push(r.id));
 state.employees.forEach((e,i)=>e.status=i<3?"Working":"Not Arrived");
 state.fleet.filter(v=>v.status==="Maintenance").forEach(v=>{if(Math.random()<.45){v.status="Ready";v.oilLife=100;v.brakes=Math.min(100,v.brakes+12);addHistory(v,"Maintenance completed; vehicle returned to Ready.")}});
 if(Math.random()<.12){let e=rand(state.employees);e.status="Called Off";e.morale=Math.max(45,e.morale-3);log(state,`${e.name} called off for today's shift.`)}
 state.career.xp+=Math.max(0,Math.round((state.satisfaction-80)+(util()/10)));log(state,"New business day opened.");render()
}
function render(){
 state.utilization=util();document.getElementById("gameDate").textContent=state.date.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});document.getElementById("gameTime").textContent=fmtTime(state.minute);document.getElementById("weatherLine").textContent=state.weather;document.getElementById("pauseBtn").textContent=state.running?"⏸ Pause":"▶ Start Day";
 let ms=[["Ready",count("Ready")],["Rented",count("Rented")],["Returns",count("Returned")],["Waiting",state.waiting.length],["Utilization",state.utilization+"%"],["Cash",money(state.cash)]];
 document.getElementById("metrics").innerHTML=ms.map(m=>`<div class="metric"><div class="label">${m[0]}</div><div class="value">${m[1]}</div></div>`).join("");
 document.getElementById("lotSummary").textContent=`${state.fleet.length} units • Reputation ${state.reputation.toFixed(1)}★`;
 renderLot();document.getElementById("eventFeed").innerHTML=state.events.map(e=>`<div class="event"><div class="event-time">${e.time}</div><div class="event-text">${e.text}</div></div>`).join("");
 document.getElementById("customerQueue").innerHTML=state.waiting.length?state.waiting.map(id=>{let r=state.reservations.find(x=>x.id===id);return `<div class="queue-item"><strong>${r.customer.name}</strong><div class="small">${r.class} • ${r.customer.loyalty} • ${fmtTime(r.pickup)}</div><div class="action-row"><button onclick="serveReservation('${r.id}',false)">Assign Vehicle</button><button onclick="serveReservation('${r.id}',true)">Free Upgrade if Needed</button></div></div>`}).join(""):`<div class="queue-item small">No customers waiting.</div>`;
 let work=[`${count("Cleaning")+count("Returned")} vehicles need turnaround`,`${count("Maintenance")+count("DamageHold")} unavailable units`,`${state.reservations.filter(r=>r.status==="Booked").length} reservations still expected`,`${state.transfers.filter(t=>t.status==="Requested").length} transfer requests`,`${state.cases.filter(c=>c.status==="Open").length} open customer cases`];
 document.getElementById("workQueue").innerHTML=work.map((w,i)=>`<div class="work-item"><strong>${i+1}. ${w}</strong></div>`).join("");
 renderCustomers();renderReservations();renderFleet();renderReturns();renderEmployees();renderSchedule();renderTransfers();renderMarket();renderContracts();renderReviews();renderCorporate();renderFinancials();renderOffice()
}
function carCard(v){return `<div class="car ${v.status.toLowerCase()}" onclick="showVehicle('${v.id}')"><div class="unit">Unit ${v.unit}</div><div class="name">${v.model}</div><div class="meta">${v.class} • ${v.mileage.toLocaleString()} mi</div><div class="meta">Fuel ${Math.round(v.fuel*8)}/8 • Clean ${v.cleanliness}%</div><span class="status">${v.status}</span>${v.damage.filter(d=>d.status==="Open").length?` <span class="status bad">Damage</span>`:""}</div>`}
function renderLot(){document.getElementById("readyLot").innerHTML=state.fleet.filter(v=>["Ready","Reserved"].includes(v.status)).map(carCard).join("")||"<div class='small'>No vehicles.</div>";document.getElementById("returnLot").innerHTML=state.fleet.filter(v=>["Returned","Cleaning"].includes(v.status)).map(carCard).join("")||"<div class='small'>No vehicles.</div>";document.getElementById("holdLot").innerHTML=state.fleet.filter(v=>["Maintenance","DamageHold"].includes(v.status)).map(carCard).join("")||"<div class='small'>No vehicles.</div>"}
function renderCustomers(){let next=state.waiting.length?state.reservations.find(r=>r.id===state.waiting[0]):null;document.getElementById("customerCounter").innerHTML=next?`<div class="customer-card"><h3>${next.customer.name}</h3><div class="detail-grid"><div><b>Reservation</b><br>${next.class}</div><div><b>Pickup</b><br>${fmtTime(next.pickup)}</div><div><b>Loyalty</b><br>${next.customer.loyalty}</div><div><b>Visits</b><br>${next.customer.visits}</div><div><b>Notes</b><br>${next.customer.note||"None"}</div><div><b>Rate</b><br>${money(next.rate)}/day</div></div><p>${next.customer.note==="Needs child seat"?"Customer asks whether a child seat is available.":"Customer is ready to review vehicle options, protection products, fuel choices, and the rental agreement."}</p><div class="counter-actions"><button onclick="serveReservation('${next.id}',false)">Assign Best Vehicle</button><button onclick="serveReservation('${next.id}',true)">Complimentary Upgrade</button><button onclick="declineCustomer('${next.id}')">Decline Rental</button></div></div>`:"<div class='queue-item small'>Counter is clear.</div>"}
window.declineCustomer=id=>{let r=state.reservations.find(x=>x.id===id);r.status="Declined";state.waiting=state.waiting.filter(x=>x!==id);state.satisfaction=Math.max(50,state.satisfaction-2);log(state,`${r.customer.name}'s rental was declined.`);render()}
function renderReservations(){let rows=state.reservations.slice().sort((a,b)=>a.pickup-b.pickup).map(r=>`<tr><td>${fmtTime(r.pickup)}</td><td>${r.customer.name}</td><td>${r.class}</td><td>${money(r.rate)}/day</td><td>${r.days}</td><td>${r.extras}</td><td>${r.status}</td></tr>`).join("");document.getElementById("reservationTable").innerHTML=`<div class="table-wrap"><table><thead><tr><th>Pickup</th><th>Customer</th><th>Class</th><th>Rate</th><th>Days</th><th>Extras</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`}
function renderFleet(){let rows=state.fleet.map(v=>`<tr onclick="showVehicle('${v.id}')"><td>${v.unit}</td><td>${v.model}</td><td>${v.class}</td><td>${v.mileage.toLocaleString()}</td><td>${v.status}</td><td>${v.condition}%</td><td>${v.damage.filter(d=>d.status==="Open").length}</td><td>${money(v.revenue)}</td><td>${money(v.value)}</td></tr>`).join("");document.getElementById("fleetTable").innerHTML=`<div class="table-wrap"><table><thead><tr><th>Unit</th><th>Vehicle</th><th>Class</th><th>Miles</th><th>Status</th><th>Condition</th><th>Open Damage</th><th>Lifetime Revenue</th><th>Value</th></tr></thead><tbody>${rows}</tbody></table></div>`}
function renderReturns(){document.getElementById("returnsList").innerHTML=state.returns.length?state.returns.map(r=>{let v=state.fleet.find(x=>x.id===r.vehicleId),d=r.damageId?v.damage.find(x=>x.id===r.damageId):null;return `<div class="return-item"><strong>Unit ${v.unit} — ${v.model}</strong><div class="small">Returned ${r.time} • ${v.mileage.toLocaleString()} miles • Fuel ${Math.round(v.fuel*8)}/8</div>${d?`<div class="bad">Possible ${d.severity.toLowerCase()} ${d.type} — ${d.area} (${money(d.cost)})</div>`:"<div class='good'>No damage flagged automatically.</div>"}<div class="action-row">${!r.inspected?`<button onclick="inspectReturn('${r.id}')">Complete Inspection</button>`:""}${d&&r.inspected&&d.status==="Open"?`<button onclick="resolveDamage('${v.id}','${d.id}',true)">Charge Customer & Repair</button><button onclick="resolveDamage('${v.id}','${d.id}',false)">Waive Charge & Repair</button>`:""}</div></div>`}).join(""):"<div class='queue-item small'>No returns awaiting review.</div>"}
function renderEmployees(){document.getElementById("employeeCards").innerHTML=state.employees.map(e=>`<div class="employee"><h3>${e.name}</h3><div class="role">${e.role}</div><div class="small">${e.status} • ${money(e.wage)}/hr</div><div class="small">Task: ${e.task}</div><div class="small" style="margin-top:8px">Morale ${e.morale}%</div><div class="bar"><div style="width:${e.morale}%"></div></div><div class="small">Skill ${e.skill}% • Attendance ${e.attendance}%</div><div class="small">Sales ${e.sales||0}% • Service ${e.service||0}% • Contracts ${e.contracts||0}</div><div class="small">Compliments ${e.compliments||0} • Complaints ${e.complaints||0}</div><div class="small">Trait: ${e.trait}</div><div class="small">Goal: ${e.ambition}</div><div class="action-row"><button onclick="assignTask(${e.id},'Counter')">Counter</button><button onclick="assignTask(${e.id},'Returns')">Returns</button><button onclick="assignTask(${e.id},'Vehicle turnaround')">Turnaround</button><button onclick="assignTask(${e.id},'Transfers')">Transfers</button></div></div>`).join("")}
window.assignTask=(id,task)=>{let e=state.employees.find(x=>x.id===id);e.task=task;log(state,`${e.name} assigned to ${task}.`);render()}
function renderSchedule(){let days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];document.getElementById("scheduleTable").innerHTML=`<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Role</th>${days.map(d=>`<th>${d}</th>`).join("")}</tr></thead><tbody>${state.employees.map(e=>`<tr><td>${e.name}</td><td>${e.role}</td>${e.schedule.map(s=>`<td>${s}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function renderTransfers(){document.getElementById("transferPanel").innerHTML=state.transfers.length?state.transfers.map(t=>`<div class="transfer-item"><strong>${t.branch}</strong><div class="small">${t.urgent?"URGENT • ":""}Needs ${t.qty} ${t.class} vehicle(s) • ${t.status}</div>${t.status==="Requested"?`<div class="action-row"><button onclick="approveTransfer('${t.id}')">Approve Transfer</button><button onclick="denyTransfer('${t.id}')">Decline</button></div>`:""}</div>`).join(""):"<div class='queue-item small'>No current transfer requests.</div>"}
window.approveTransfer=id=>{let t=state.transfers.find(x=>x.id===id),cars=state.fleet.filter(v=>v.status==="Ready"&&v.class===t.class).slice(0,t.qty);if(cars.length<t.qty){alert("Not enough ready vehicles in that class.");return}cars.forEach(v=>{v.status="Rented";addHistory(v,`Transferred temporarily to ${t.branch}.`)});t.status="Approved";state.expensesToday+=35*t.qty;state.cash-=35*t.qty;state.career.xp+=2;log(state,`Approved transfer of ${t.qty} ${t.class} vehicle(s) to ${t.branch}.`);render()}
window.denyTransfer=id=>{let t=state.transfers.find(x=>x.id===id);t.status="Declined";log(state,`Declined ${t.branch} transfer request.`);render()}
function renderMarket(){document.getElementById("marketPanel").innerHTML=state.market.map(m=>`<div class="market-item"><strong>${m.model}</strong><div class="small">${m.class} • Fleet price ${money(m.cost)} • ${m.qty} available • delivery ${m.deliveryDays} days</div><div class="action-row"><button onclick="buyVehicle('${m.id}')">Buy 1</button></div></div>`).join("")+`<div class="market-item"><strong>Sell aging fleet</strong><div class="small">Vehicles over 55,000 miles can be sold from their vehicle detail screen.</div></div>`}
window.buyVehicle=id=>{let m=state.market.find(x=>x.id===id);if(!m||m.qty<1)return;if(state.cash<m.cost){alert("Not enough branch cash.");return}let i=state.fleet.length+Math.floor(Math.random()*200),v=vehicle(i);v.model=m.model;v.class=m.class;v.acquiredCost=m.cost;v.value=m.cost;v.mileage=8;v.status="Ready";v.history=[{date:fmtDate(state.date),text:`Purchased new through fleet allocation for ${money(m.cost)}.`}];state.fleet.push(v);state.cash-=m.cost;state.expensesToday+=m.cost;m.qty--;log(state,`Purchased ${m.model}, Unit ${v.unit}.`);render()}

function renderContracts(){
 let el=document.getElementById("contractsPanel");if(!el)return;
 el.innerHTML=state.contracts.length?state.contracts.map(c=>`<div class="contract-card"><strong>${c.number} — ${c.customerName}</strong>
 <div class="small">Unit ${c.unit} • Agent ${c.agent} • ${c.status} • ${c.days} day(s)</div>
 <div><span class="badge">${money(c.rate)}/day</span>${c.protection?'<span class="badge good">Protection</span>':''}${c.fuelPlan?'<span class="badge">Fuel Plan</span>':''}${c.roadside?'<span class="badge">Roadside</span>':''}${c.oneWay?`<span class="badge warn">One-Way → ${c.returnBranch}</span>`:''}</div>
 <div class="small">Out: ${c.mileageOut.toLocaleString()} mi • Fuel ${c.fuelOut}${c.mileageIn!=null?` • In: ${c.mileageIn.toLocaleString()} mi • Fuel ${c.fuelIn}`:""}</div></div>`).join(""):"<div class='queue-item small'>No rental contracts yet.</div>"
}
function renderReviews(){
 let el=document.getElementById("reviewsPanel");if(!el)return;
 let avg=state.reviews.length?(state.reviews.reduce((a,x)=>a+x.rating,0)/state.reviews.length).toFixed(1):"—";
 el.innerHTML=`<div class="kpi-grid"><div class="kpi"><span class="small">Branch Rating</span><br><b>${avg}★</b></div><div class="kpi"><span class="small">Avg Wait</span><br><b>${state.branchStats.waitMinutes}m</b></div><div class="kpi"><span class="small">Protection Attach</span><br><b>${state.branchStats.protectionAttach}%</b></div><div class="kpi"><span class="small">Ready Rate</span><br><b>${state.branchStats.readyRate}%</b></div></div>`+
 (state.reviews.length?state.reviews.map(r=>`<div class="review-card"><strong>${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)} — ${r.customer}</strong><div class="small">${r.date}</div><div>${r.text}</div></div>`).join(""):"<div class='queue-item small'>No customer reviews yet.</div>")
}

function renderCorporate(){let c=state.corporate;document.getElementById("corporatePanel").innerHTML=`<div class="corp-item"><strong>Regional Scorecard</strong><div class="detail-grid"><div>Utilization<br><b class="${state.utilization>=c.utilizationTarget?'good':'warn'}">${state.utilization}% / ${c.utilizationTarget}%</b></div><div>Satisfaction<br><b class="${state.satisfaction>=c.satisfactionTarget?'good':'warn'}">${state.satisfaction}% / ${c.satisfactionTarget}%</b></div><div>Damage Recovery Target<br><b>${c.damageRecoveryTarget}%</b></div><div>Regional Score<br><b>${c.score}</b></div></div></div><div class="corp-item"><strong>Career</strong><div class="small">${state.career.title} • Salary ${money(state.career.salary)} • Career XP ${state.career.xp}</div><div class="small">Next opportunity: ${state.career.next}</div>${state.career.xp>=80?`<div class="action-row"><button onclick="applyPromotion()">Apply for Promotion</button></div>`:"<div class='small'>Build XP through customer, fleet, and branch performance.</div>"}</div>`}
window.applyPromotion=()=>{if(state.career.xp<80)return;let success=Math.random()<.72;if(success){state.career.title="Senior Branch Manager";state.career.salary=68500;state.career.next="Area Manager";state.career.xp=0;state.inbox.unshift({from:"Regional VP",subject:"Promotion approved",body:"Congratulations. You have been promoted to Senior Branch Manager."});log(state,"Promotion approved: Senior Branch Manager.")}else{state.career.xp-=10;state.inbox.unshift({from:"Regional VP",subject:"Promotion decision",body:"Not selected this round. Continue building branch performance."});log(state,"Promotion application was not selected.")}render()}
function renderFinancials(){let vals=[["Revenue Today",money(state.revenueToday)],["Expenses Today",money(state.expensesToday)],["Net Today",money(state.revenueToday-state.expensesToday)],["Cash",money(state.cash)],["Customer Score",state.satisfaction+"%"],["Reputation",state.reputation.toFixed(1)+"★"]];document.getElementById("financialMetrics").innerHTML=vals.map(m=>`<div class="metric"><div class="label">${m[0]}</div><div class="value">${m[1]}</div></div>`).join("");document.getElementById("ledger").innerHTML=state.ledger.length?`<div class="table-wrap"><table><thead><tr><th>Time</th><th>Description</th><th>Amount</th></tr></thead><tbody>${state.ledger.map(x=>`<tr><td>${x.time}</td><td>${x.desc}</td><td class="${x.amount>=0?'good':'bad'}">${money(x.amount)}</td></tr>`).join("")}</tbody></table></div>`:"<div class='queue-item small'>No financial activity yet today.</div>"}
function renderOffice(){document.getElementById("managerInbox").innerHTML=state.inbox.map(i=>`<div class="inbox-item"><strong>${i.subject}</strong><div class="small">From: ${i.from}</div><div style="margin-top:4px">${i.body}</div></div>`).join("")}
window.showVehicle=id=>{let v=state.fleet.find(x=>x.id===id);let open=v.damage.filter(d=>d.status==="Open");document.getElementById("modalContent").innerHTML=`<h2>Unit ${v.unit} — ${v.model}</h2><div class="detail-grid"><div><b>Status</b><br>${v.status}</div><div><b>Class</b><br>${v.class}</div><div><b>VIN</b><br>${v.vin}</div><div><b>Plate</b><br>${v.plate}</div><div><b>Mileage</b><br>${v.mileage.toLocaleString()} mi</div><div><b>Fuel</b><br>${Math.round(v.fuel*8)}/8</div><div><b>Oil Life</b><br>${v.oilLife}%</div><div><b>Tires / Brakes</b><br>${v.tires}% / ${v.brakes}%</div><div><b>Lifetime Rentals</b><br>${v.rentals}</div><div><b>Lifetime Revenue</b><br>${money(v.revenue)}</div><div><b>Acquisition</b><br>${money(v.acquiredCost)}</div><div><b>Current Value</b><br>${money(v.value)}</div></div><h3>Condition Walk-Around</h3><div class="vehicle-diagram"><button onclick="markCondition(\'${v.id}\',\'front\')">Front</button><button onclick="markCondition(\'${v.id}\',\'rear\')">Rear</button><button onclick="markCondition(\'${v.id}\',\'driver\')">Driver Side</button><button onclick="markCondition(\'${v.id}\',\'passenger\')">Passenger Side</button></div><h3>Damage History</h3>${v.damage.length?v.damage.map(d=>`<div class="return-item"><b>${d.date}: ${d.severity} ${d.type}</b> — ${d.area}<br><span class="small">${money(d.cost)} • ${d.status}${d.customerCharged?" • customer charged":""}</span></div>`).join(""):"<div class='small'>No damage history.</div>"}<h3>Vehicle History</h3><div class="history">${v.history.map(h=>`<div><b>${h.date}</b> — ${h.text}</div>`).join("")}</div><div class="action-row">${v.mileage>=55000?`<button onclick="sellVehicle('${v.id}')">Sell Vehicle</button>`:""}${v.status==="Maintenance"?`<button onclick="finishMaintenance('${v.id}')">Complete Maintenance</button>`:""}</div>`;document.getElementById("modal").showModal()}
window.markCondition=(id,area)=>{let v=state.fleet.find(x=>x.id===id);let d=damageEvent(v,"Minor");d.area=area+" side";addHistory(v,`Walk-around noted ${d.type} on ${d.area}.`);render();showVehicle(id)}
window.sellVehicle=id=>{let v=state.fleet.find(x=>x.id===id);if(["Rented","Returned"].includes(v.status)){alert("Vehicle cannot be sold while on rent or awaiting return processing.");return}state.cash+=v.value;state.revenueToday+=v.value;log(state,`Sold Unit ${v.unit} for ${money(v.value)}.`);state.fleet=state.fleet.filter(x=>x.id!==id);document.getElementById("modal").close();render()}
window.finishMaintenance=id=>{let v=state.fleet.find(x=>x.id===id);v.status="Ready";v.oilLife=100;v.brakes=Math.min(100,v.brakes+15);v.tires=Math.min(100,v.tires+10);addHistory(v,"Maintenance completed manually by branch manager authorization.");document.getElementById("modal").close();render()}
document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));btn.classList.add("active");document.getElementById(btn.dataset.view).classList.add("active")});
document.getElementById("pauseBtn").onclick=()=>{state.running=!state.running;if(state.running&&!timer)timer=setInterval(()=>tick(5),850);else if(!state.running&&timer){clearInterval(timer);timer=null}render()};
document.getElementById("advanceBtn").onclick=()=>tick(15);document.getElementById("nextDayBtn").onclick=()=>nextDay();
document.getElementById("saveBtn").onclick=()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify({...state,date:state.date.toISOString()}));log(state,"Game saved locally.");render()};
document.getElementById("loadBtn").onclick=()=>{let raw=localStorage.getItem(STORAGE_KEY);if(!raw){alert("No saved game found.");return}state=JSON.parse(raw);state.date=new Date(state.date);state.running=false;if(timer){clearInterval(timer);timer=null}log(state,"Saved game loaded.");render()};
document.getElementById("newReservationBtn").onclick=()=>{let c=customer(),r={id:uid(),customer:c,pickup:state.minute,days:1+Math.floor(Math.random()*3),class:rand(classes),rate:Math.floor(55+Math.random()*90),status:"Waiting",extras:"None",assignedVehicle:null};state.reservations.push(r);state.waiting.push(r.id);log(state,`${c.name} walked in without a reservation.`);render()};
document.getElementById("serveNextBtn").onclick=()=>{if(!state.waiting.length)return;serveReservation(state.waiting[0],false)};
document.querySelectorAll("[data-office]").forEach(b=>b.onclick=()=>{let type=b.dataset.office,content={emails:"Corporate and customer messages appear in your Manager Inbox.",reports:`Utilization ${state.utilization}%. Satisfaction ${state.satisfaction}%. Revenue today ${money(state.revenueToday)}.`,cases:`${state.cases.filter(c=>c.status==="Open").length} open customer cases.`,maintenance:`${count("Maintenance")} maintenance units and ${count("DamageHold")} damage holds.`,phone:"Roadside calls, employee call-offs, branch requests, and customer escalations will appear as events and inbox items.",reputation:`Branch reputation is ${state.reputation.toFixed(1)}★. High wait times, denied rentals, and poor vehicle readiness can reduce it.`}[type];document.getElementById("modalContent").innerHTML=`<h2>${b.textContent}</h2><p>${content}</p>`;document.getElementById("modal").showModal()});
window.addEventListener("keydown",e=>{if(e.code==="Space"&&!["INPUT","TEXTAREA","BUTTON"].includes(document.activeElement.tagName)){e.preventDefault();document.getElementById("pauseBtn").click()}if(e.key.toLowerCase()==="d")tick(15)});
render();
