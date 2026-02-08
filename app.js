let app

let page = "home"

function cleanupOverlays(){
 document
  .querySelectorAll(
   ".modal, .breath-overlay, .goal-pop, .affirmBox"
  )
  .forEach(e => e.remove())
}

function uid(){return "id_"+Date.now()+"_"+Math.floor(Math.random()*9999)}

function load(k,f){
 try{return JSON.parse(localStorage.getItem(k))||f}
 catch{return f}
}

function save(k,v){localStorage.setItem(k,JSON.stringify(v))}

function goalCreateIconPickHandler(icon){

 pickedGoalIcon = icon

 const prev = document.getElementById("goalIconPreview")
 if(prev){
  prev.innerHTML = `<i data-lucide="${icon}"></i>`
  setTimeout(()=>lucide.createIcons(),0)
 }
}

// ======================
// ICON SYSTEM
// ======================

const iconCatalog = {

 Selfcare: [
  "heart","sparkles","bath","flower","coffee",
  "smile","sun","moon","droplet","feather"
 ],

 Entspannung: [
  "lotus","leaf","spa","wind","cloud",
  "sunrise","sunset","waves","flame","sparkles"
 ],

 Bewegung: [
  "dumbbell","activity","zap","timer","footprints",
  "bike","flame","trophy","medal","rocket"
 ],

 Haushalt: [
  "home","bed","sofa","utensils","chef-hat",
  "washing-machine","trash","package","tool","lamp"
 ],

 Essen: [
  "apple","carrot","utensils","coffee","cake",
  "pizza","salad","sandwich","milk","cookie"
 ],

 Gesundheit: [
  "brain","heart-pulse","shield","anchor","eye",
  "lightbulb","compass","message-circle","book","feather"
 ],

 Leben: [
  "calendar","clock","map","compass","sun",
  "cloud","home","users","phone","mail"
 ],

 Ziele: [
  "target","flag","trophy","award","star",
  "rocket","milestone","check-circle","focus","goal"
 ],

 Erfolg: [
  "trending-up","bar-chart","award","crown","gem",
  "star","sparkles","medal","trophy","flag"
 ],

 Natur: [
  "leaf","tree","flower","sun","mountain",
  "waves","cloud","bug","bird","sprout"
 ]

}

const iconList = Object.values(iconCatalog).flat()

let pickedIcon = null          // für Task / Catalog / allgemeine IconPicker
let pickedGoalIcon = "target"  // speziell für Goals (mit Default)

const TASK_CATEGORIES = [
 "selfcare",
 "bewegung",
 "haushalt",
 "essen",
 "gesundheit",
 "natur",
 "erfolg",
 "ziele"
]

function categorySelectHTML(id="taskCategory"){
 return `
 <select id="${id}">
  ${TASK_CATEGORIES.map(c =>
   `<option value="${c}">${c}</option>`
  ).join("")}
 </select>
 `
}

function openIconPicker(onPick){

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

   <h3>Icon wählen</h3>

   <div class="iconPreview">
     Vorschau:
     <i id="iconPreviewIcon" data-lucide="circle"></i>
   </div>

   <input
     class="iconSearch"
     placeholder="Icon suchen..."
     oninput="filterIcons(this.value)"
   >

   <div class="iconGrid" id="iconGrid"></div>

   <button onclick="cleanupOverlays()">schließen</button>

 </div>
 `

 document.body.appendChild(modal)

 window._iconPickCallback = onPick

 renderIconPickerByCategory()

 setTimeout(()=>lucide.createIcons(),0)
}

function filterIcons(val){
 renderIconPickerByCategory(val)
}

function renderIconPickerByCategory(filterText=""){

 const grid = document.getElementById("iconGrid")
 if(!grid) return

 const q = filterText.toLowerCase()

 grid.innerHTML = Object.entries(iconCatalog).map(([cat,icons])=>{

  const filtered = icons.filter(name =>
   name.toLowerCase().includes(q)
  )

  if(!filtered.length) return ""

  return `
   <div class="iconCategoryTitle">${cat}</div>

   <div class="iconGrid iconCat-${cat}">
    ${filtered.map(name => `
      <div class="iconBtn"
        onclick="pickIcon('${name}')">
        <i data-lucide="${name}"></i>
      </div>
    `).join("")}
   </div>
  `

 }).join("")

 lucide.createIcons()
}

function pickIcon(name){

 // nur Callback verwenden
 if(typeof window._iconPickCallback === "function"){
  window._iconPickCallback(name)
 }

 cleanupOverlays()
}

function setTaskIcon(name){
 pickedIcon = name

 const el = document.getElementById("taskIconPreview")
 if(!el) return

 el.innerHTML = `<i data-lucide="${name}"></i>`
 lucide.createIcons()
}

function toggleItemType(){

 const t = document.getElementById("itemType").value

 document.getElementById("itemText").style.display =
  t==="text" ? "block" : "none"

 document.getElementById("itemLink").style.display =
  t==="link" ? "block" : "none"

 document.getElementById("itemImg").style.display =
  t==="image" ? "block" : "none"
}

function saveItemModal(catId, subId){

 const name = document.getElementById("itemName").value.trim()
 const type = document.getElementById("itemType").value
 const text = document.getElementById("itemText").value
 const link = document.getElementById("itemLink").value

 if(!name){
  alert("Titel fehlt")
  return
 }

 addCategoryItem(catId, subId, {
  name,
  type,
  text,
  link
 })

 closeModal()
}

// ======================
// AFFIRMATION SYSTEM (FINAL)
// ======================

// ========= affirmations =========

const affirmations = [

"🌿 Ich bin sicher",
"💛 Ich bin genug",
"🌸 Ich bin wertvoll",
"🕊 Ich darf langsam machen",
"🌊 Gefühle dürfen kommen und gehen",
"🌞 Ich vertraue mir",
"🌷 Ich darf mich schützen",
"💎 Ich bin wichtig",
"🌼 Ich darf Pausen machen",
"🍃 Ich darf atmen",
"🔥 Ich bin stärker als meine Angst",
"🌈 Ich bin getragen",
"💫 Ich bin liebenswürdig",
"🧡 Mein Körper darf sich beruhigen",
"🌙 Ich darf loslassen",
"🌻 Ich darf freundlich zu mir sein",
"🌸 Ich bin richtig so",
"💚 Ich darf Raum einnehmen",
"🌞 Ich darf heute sanft sein",
"🌊 Mein Nervensystem darf sich regulieren",
"✨ Ich darf vertrauen",
"🌺 Ich darf fühlen",
"🕊 Ich darf still werden",
"🌷 Ich bin auf meinem Weg",
"💛 Ich darf Unterstützung annehmen",
"🌿 Ich darf weich sein",
"🌈 Ich darf wachsen",
"💫 Ich darf mich lieben",
"🌻 Ich darf neu beginnen",
"🧡 Ich bin gehalten"


]

const affirmationsSupport = affirmations
const affirmationsNeutral = affirmations

// State statt Einzelvariable → kein Init-Fehler mehr

let affirmationState = load("affirmationState", {
 text: null,
 ts: 0
})

// safety guard gegen kaputtes localStorage
if(!affirmationState || typeof affirmationState !== "object"){
 affirmationState = { text:null, ts:0 }
}

function triggerAffirmation(type="neutral"){

 if(settings?.affirmationsOff) return

 const pool =
  type === "support"
   ? affirmationsSupport
   : affirmationsNeutral

 affirmationState = {
  text: pool[Math.floor(Math.random()*pool.length)],
  ts: Date.now()
 }

 save("affirmationState", affirmationState)
}

function goalIconPickHandler(icon){

 pickedGoalIcon = icon

 const prev = document.getElementById("wizIconPrev")
 if(prev){
  prev.innerHTML = `<i data-lucide="${icon}"></i>`
  lucide.createIcons()
 }
}

function getActiveAffirmation(){

 if(!affirmationState?.text) return null

 // auto-hide nach 2 Stunden
 if(Date.now() - affirmationState.ts > 2*60*60*1000){
   affirmationState = { text:null, ts:0 }
   save("affirmationState", affirmationState)
   return null
 }

 return affirmationState.text
}


function todayISO(){return new Date().toISOString().slice(0,10)}

function addDays(base, n){
 const d = new Date(base)
 d.setDate(d.getDate()+n)
 return d.toISOString().slice(0,10)
}

function daysBetween(a, b){
 const d1 = new Date(a)
 const d2 = new Date(b)

 d1.setHours(0,0,0,0)
 d2.setHours(0,0,0,0)

 return Math.round((d2 - d1) / 86400000)
}

function nowHM(){
 const d=new Date()
 return [d.getHours(),d.getMinutes()]
}

function changeDay(n){
 selectedDate = addDays(selectedDate, n)
 render()
}

// ========= storage =========

let catalog = load("catalog",[])
let plans   = load("plans",[])
let logs    = load("logs",[])
let moods   = load("moods",[])
let selectedDate = todayISO()
let goals = load("goals",[])
let categories = load("categories",[])

categories.forEach(c=>{
 c.children = c.children || []
 c.children.forEach(s=>{
  s.items = s.items || []
 })

})

let metrics = load("metrics", {})

let profile = load("profile", {
 name: "Friend",
 birthYear: null
})

let tempStoragePlan = null

let metricDefs = load("metricDefs", [])

const metricPresets = [

 {key:"weight", label:"Gewicht", unit:"kg"},
 {key:"height", label:"Größe", unit:"cm"},
 {key:"steps", label:"Schritte", unit:"steps"},
 {key:"water", label:"Wasser", unit:"ml"},
 {key:"sleep", label:"Schlaf", unit:"h"},
{key:"cycle", label:"Zyklus Tracking", unit:""},
{key:"pregnancy", label:"Schwangerschaft", unit:""},
 {key:"waist", label:"Taillenumfang", unit:"cm"}

]

let settings = load("settings", {
 affirmationsOff: false
})

let pregnancyStart = load("pregnancyStart", null)

let cycleStarts = load("cycleStarts", [])

let panicStep = 1

// ========= goals storage =========

function saveGoals(){
 save("goals", goals)

render()
}

function deleteGoal(id){
 if(!confirm("Goal wirklich löschen?")) return
 goals = goals.filter(x=>x.id!==id)
 saveGoals()
 renderGoals()
}

function archiveGoal(id){

 const g = goals.find(x=>x.id===id)
 if(!g) return

 g.archived = true
 saveGoals()
 renderGoals()
}

// ========= day phases =========

const phases = {
 morning:[6,30,11,59],
 mid:[12,0,16,59],
 evening:[17,0,22,29],
 night:[22,30,6,29]
}

function inRange(h,m,a,b,c,d){
 const t=h*60+m
 const s=a*60+b
 const e=c*60+d
 if(e<s) return t>=s || t<=e
 return t>=s && t<=e
}

function dayPhase(){
 const [h,m]=nowHM()
 if(inRange(h,m,...phases.morning)) return ["Guten Morgen ☀️","morning"]
 if(inRange(h,m,...phases.mid)) return ["Hallo 🌿","mid"]
 if(inRange(h,m,...phases.evening)) return ["Guten Abend 🌙","evening"]
 return ["Gute Nacht 😴","night"]
}

const phaseStyle = {
 morning:{
  title:"Morgen ☀️",
  bg:"rgba(255,220,120,0.25)"
 },
 mid:{
  title:"Mittag 🌿",
  bg:"rgba(140,220,160,0.25)"
 },
 evening:{
  title:"Abend ✨",
  bg:"rgba(200,160,255,0.25)"
 },
 night:{
  title:"Nacht 🌙",
  bg:"rgba(80,110,200,0.25)"
 }
}

// ========= catalog =========

function addCatalogTask(name, icon){

 const t = {
  id: uid(),
  name,
  icon: icon || "circle"
 }

 catalog.push(t)
 save("catalog", catalog)

 page = "catalog"
 render()
}

function deleteCatalogTask(id){
 if(!confirm("Task wirklich löschen?")) return

 catalog = catalog.filter(t => t.id !== id)
 save("catalog", catalog)

 page = "catalog"
 render()
}

// ========= categories =========

// ---------- helpers ----------

function saveCategories(){
 save("categories", categories)
render()
}

function addMetricDef(){

 const name = document.getElementById("newMetricName").value.trim()
 const unit = document.getElementById("newMetricUnit").value.trim()

 if(!name) return

const key = name.toLowerCase().replace(/\s+/g, "_")

 metricDefs.push({
  key,
  label:name,
  unit
 })

 save("metricDefs", metricDefs)

 renderSettings()
}

function calcAge(){
 if(!profile.birthYear) return null
 return new Date().getFullYear() - profile.birthYear
}

function pregnancyWeek(){

 if(!pregnancyStart) return null

 const days = daysBetween(pregnancyStart, todayISO())
 return Math.floor(days/7)+1
}

function currentCycleDay(){

 if(!cycleStarts.length) return null

 const last = cycleStarts.slice().sort().pop()
 return daysBetween(last, todayISO()) + 1
}

function cycleStats(){

 if(cycleStarts.length < 2) return null

 const s = cycleStarts.slice().sort()
 const lens=[]

 for(let i=1;i<s.length;i++){
  lens.push(daysBetween(s[i-1], s[i]))
 }

 return {
  avg: Math.round(lens.reduce((a,b)=>a+b,0)/lens.length),
  min: Math.min(...lens),
  max: Math.max(...lens)
 }
}

function cycleHistoryList(){

 if(cycleStarts.length < 2) return []

 const s = cycleStarts.slice().sort()

 const list = []

 for(let i=1;i<s.length;i++){
  list.push({
   from: s[i-1],
   to: s[i],
   len: daysBetween(s[i-1], s[i])
  })
 }

 return list.reverse()
}

function getWeekNumber(d){
 d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
 d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7))
 const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
 return Math.ceil((((d - yearStart)/86400000)+1)/7)
}

function addMetricValue(key, value){

 if(!metrics[key]) metrics[key] = []

 metrics[key].push({
  date: todayISO(),
  value: value
 })

 save("metrics", metrics)
}

function lastMetricValue(key){
 const arr = metrics[key]
 if(!arr || !arr.length) return null
 return arr[arr.length-1]
}

// ---------- render main ----------

function renderCategories(){

 app.innerHTML = `
 <h1>Storage🌸</h1>

 <button class="primary" onclick="addCategoryPrompt()">
  Kategorie +
 </button>

 <div id="catBox"></div>
 `

 const box = document.getElementById("catBox")

 categories.forEach(c=>{

  const d=document.createElement("div")
  d.className="card"

  d.innerHTML=`
   <strong>${c.name}</strong>

   <button style="float:right"
   onclick="deleteCategory('${c.id}')">✖</button>

   <br>
   <button onclick="openSubcategories('${c.id}')">
    öffnen
   </button>
  `

  box.appendChild(d)
 })
}

function addCategoryPrompt(){
 const name = prompt("Kategorie Name")
 if(!name) return
 addCategory(name)
}

// ---------- category delete ----------

function deleteCategory(id){
 if(!confirm("Kategorie wirklich löschen?")) return
 categories = categories.filter(c => c.id !== id)
 saveCategories()
 renderCategories()
}

// ---------- subcategories ----------

function openSubcategories(catId){

 const cat = categories.find(c=>c.id===catId)
 if(!cat) return

 app.innerHTML = `
 <h1>${cat.name}</h1>

 <button class="primary"
 onclick="addSubCategoryPrompt('${catId}')">
 Unterkategorie +
 </button>

 <button onclick="renderCategories()">⬅ zurück</button>

 <div id="subBox"></div>
 `

 const box = document.getElementById("subBox")

 cat.children.forEach(s=>{
  const d=document.createElement("div")
  d.className="card"

  d.innerHTML=`
   <strong>${s.name}</strong>

   <button style="float:right"
   onclick="deleteSubCategory('${cat.id}','${s.id}')">✖</button>

   <br>
   <button onclick="openItems('${cat.id}','${s.id}')">
    öffnen
   </button>
  `

  box.appendChild(d)
 })
}

function addSubCategoryPrompt(catId){
 const name = prompt("Unterkategorie Name")
 if(!name) return
 addSubCategory(catId, name)
}

function deleteSubCategory(catId, subId){
 if(!confirm("Unterkategorie wirklich löschen?")) return

 const cat = categories.find(c => c.id === catId)
 if(!cat) return

 cat.children = cat.children.filter(s => s.id !== subId)

 saveCategories()
 openSubcategories(catId)
}

// ---------- items ----------

function openItems(catId, subId){

 const cat = categories.find(c=>c.id===catId)
 const sub = cat?.children.find(s=>s.id===subId)
 if(!sub) return

 app.innerHTML = `
 <h1>${sub.name}</h1>

 <button class="primary"
 onclick="addItemPrompt('${catId}','${subId}')">
 Eintrag +
 </button>

 <button onclick="openSubcategories('${catId}')">
 ⬅ zurück
 </button>

 <div id="itemBox"></div>
 `

 const box = document.getElementById("itemBox")

 sub.items.forEach(i=>{

  const d = document.createElement("div")
  d.className = "card"

  d.innerHTML = `
  <strong>${i.name}</strong>

  <div style="
   margin-top:10px;
   display:flex;
   gap:8px;
   flex-wrap:wrap;
  ">

  <button onclick="
  openStorageFromTask({
   catId:'${catId}',
   subId:'${subId}',
   itemId:'${i.id}'
  })
  ">
  📂 öffnen
  </button>

  <button onclick="
  createTaskFromCategoryItem(
   '${i.name}',
   '${catId}',
   '${subId}',
   '${i.id}'
  )
  ">
  ✅ Task planen
  </button>

  <button style="margin-left:auto"
  onclick="deleteItem('${catId}','${subId}','${i.id}')">
  🗑️
  </button>

  </div>
  `

  box.appendChild(d)
 })
}




function addItemPrompt(catId, subId){

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

 <h3>Neuer Eintrag</h3>

 <input id="itemName" placeholder="Titel">

 <select id="itemType" onchange="toggleItemType()">
  <option value="text">Text</option>
  <option value="link">Link</option>
  <option value="image">Bild</option>
 </select>

 <textarea id="itemText" placeholder="Text"></textarea>

 <input id="itemLink" placeholder="https://"
 style="display:none">

 <input type="file" id="itemImg"
 accept="image/*"
 style="display:none">

 <button class="primary"
 onclick="saveItemModal('${catId}','${subId}')">
 speichern
 </button>

 <button onclick="closeModal()">abbrechen</button>

 </div>
 `

 document.body.appendChild(modal)
}


function deleteItem(catId, subId, itemId){
 if(!confirm("Eintrag wirklich löschen?")) return

 const cat = categories.find(c => c.id === catId)
 if(!cat) return

 const sub = cat.children.find(s => s.id === subId)
 if(!sub) return

 sub.items = sub.items.filter(i => i.id !== itemId)

 saveCategories()
 openItems(catId, subId)
}

function addCategory(name){

 const c = {
  id: uid(),
  name,
  children:[]
 }

 categories.push(c)
 save("categories", categories)
 renderCategories()
}

function addSubCategory(parentId, name){

 const p = categories.find(c => c.id === parentId)
 if(!p) return

 p.children.push({
  id: uid(),
  name,
  items:[]
 })

 save("categories", categories)
 openSubcategories(parentId)
}

function addCategoryItem(catId, subId, item){

 const c = categories.find(x => x.id === catId)
 if(!c) return

 const s = c.children.find(x => x.id === subId)
 if(!s) return

 s.items.push({
 id: uid(),
 name: item.name || "",
 type: item.type || "text",
 text: item.text || "",
 link: item.link || "",
 img: null
})

 save("categories", categories)

 cleanupOverlays()
 openItems(catId, subId)
}

function searchAll(term){

 const res=[]
 const t = term.toLowerCase()

 categories.forEach(c=>{
  if(c.name.toLowerCase().includes(t))
    res.push({type:"cat", name:c.name})

  c.children.forEach(s=>{
   if(s.name.toLowerCase().includes(t))
     res.push({type:"sub", name:s.name})

   s.items.forEach(i=>{
    if(i.name?.toLowerCase().includes(t) ||
       i.text?.toLowerCase().includes(t)){
        res.push({type:"item", name:i.name})
    }
   })
  })
 })

 return res
}

// ========= planning =========


function deletePlan(id){

 const p = plans.find(x=>x.id===id)
 if(!p) return

 if(p.interval === "once"){
   if(!confirm("Task löschen?")) return
   plans = plans.filter(x=>x.id!==id)
 } else {
   const all = confirm("Ganze Serie löschen?\nAbbrechen = nur heutige Instanz aus Logs entfernen")
   if(all){
     plans = plans.filter(x=>x.id!==id)
   } else {
     // nur heute abhaken entfernen
     const todayInstances = instancesForDate(selectedDate)
       .filter(i=>i.planId===id)
       .map(i=>i.instance)

     logs = logs.filter(l=>!todayInstances.includes(l))
     save("logs", logs)
     render()
     return
   }
 }

 save("plans",plans)
 render()
}

// ========= interval logic =========

function planActiveToday(p){

 const d = daysBetween(p.start,todayISO())

if(d < 0) return false

 if(p.interval === "once")
  return todayISO() === p.start

 if(p.interval === "daily") return true
 if(p.interval === "everyX") return d % p.everyX === 0
 if(p.interval === "weekly") return d % 7 === 0

 if(p.interval === "monthly"){
  const s = new Date(p.start)
  const n = new Date(todayISO())
  return s.getDate() === n.getDate()
 }

 return true
}

// ========= instances =========

function instancesForDate(date){

 const arr=[]

 plans.forEach(p=>{

  const d = daysBetween(p.start, date)

if(d < 0) return

  if(p.interval === "once" && date !== p.start) return

  if(p.interval === "daily") {}

  else if(p.interval === "everyX" && d % p.everyX !== 0) return

  else if(p.interval === "weekly" && d % 7 !== 0) return

  else if(p.interval === "monthly"){
    const s = new Date(p.start)
    const n = new Date(date)
    if(s.getDate() !== n.getDate()) return
  }

  p.times.forEach(t=>{
    arr.push({
      instance: p.id+"_"+date+"_"+t,
      planId: p.id,
      time: t,
      task: p.taskId
 ? catalog.find(c=>c.id===p.taskId)
 : {name: p.storageLink?.name || "Storage Task"}
    })
  })

 })

 return arr
}

// ========= logs =========

function toggleInstance(id){
 const f=logs.find(x=>x===id)
 if(f) logs=logs.filter(x=>x!==id)
 else logs.push(id)
 save("logs",logs)
 render()
}

function done(id){return logs.includes(id)}

function hasSuccessOnDate(date){

 return logs.some(id => {

  if(!id.includes("_"+date+"_")) return false

  const last = id.lastIndexOf("_")
  const planId = id.slice(0,last)

  const p = plans.find(x => x.id === planId)

  return p?.success === true
 })
}

function getTopStreaks(){

 const perTaskDays = {}

 logs.forEach(id=>{

  const last = id.lastIndexOf("_")
  const planId = id.slice(0,last)

  const date = id.slice(last-10,last)

  const p = plans.find(x=>x.id===planId)
  if(!p || !p.success) return

  const task = catalog.find(t=>t.id===p.taskId)
  if(!task) return

  if(!perTaskDays[task.name])
    perTaskDays[task.name] = new Set()

  perTaskDays[task.name].add(date)
 })

 const results = []

 Object.entries(perTaskDays).forEach(([name,set])=>{

  const days = Array.from(set).sort()
  let best = 0
  let current = 0
  let prev = null

  days.forEach(d=>{
    if(!prev){
      current = 1
    } else {
      const diff = daysBetween(prev,d)
      current = diff === 1 ? current+1 : 1
    }
    if(current > best) best = current
    prev = d
  })

  if(best >= 2) results.push([name,best])
 })

 return results
  .sort((a,b)=>b[1]-a[1])
  .slice(0,3)
}

// ========= GOAL PROGRESS =========

function goalProgress(g){
 if(!g.target) return 0
 return goalPercent(g)
}



function goalAutoCount(goal){

 if(!goal.taskId) return 0

 const counted = new Set()

 logs.forEach(id=>{

 const last = id.lastIndexOf("_")
const planId = id.slice(0,last)
const date = id.slice(last-10,last)

  const p = plans.find(x=>x.id===planId)
  if(!p) return
  if(!p.success) return
  if(p.taskId !== goal.taskId) return

  if(goal.start && date < goal.start) return

  if(goal.mode === "total" && goal.due){
    if(date > goal.due) return
  }

if(goal.mode === "week"){
 const d = new Date(date)
 const now = new Date()

 if(getWeekNumber(d) !== getWeekNumber(now)) return
}

  if(goal.mode === "month"){
    const d = new Date(date)
    const now = new Date(todayISO())
    if(
      d.getMonth() !== now.getMonth() ||
      d.getFullYear() !== now.getFullYear()
    ) return
  }

  counted.add(planId + "_" + date)

 })

 return counted.size

}

// ========= goal progress =========

// ========= mood =========

const moodTexts = {

 "🤩": [
  "Da ist richtig viel Lebendigkeit heute ✨",
  "Wow — sauge das Gefühl richtig auf🪁",
  "Das fühlt sich nach Aufblühen an 🌞"
 ],

 "😄": [
  "Leichtigkeit steht dir gut 🌿",
  "Schön, dass du dich gerade so gut fühlst🤍",
  "Das darfst du geniessen🌸"
 ],

 "😊": [
  "Das ist ein ruhiger, guter Moment ✨",
  "Sanft zufrieden ist vollkommen genug💞",
  "Du bist gerade gut bei dir🌿"
 ],

 "🧘🏽‍♀️": [
  "Dein System wirkt gerade ruhig 🌿",
  "Das ist innere Balance ⚖️",
  "Du bist schön geerdet🌳"
 ],

 "🥰": [
  "Das fühlt sich warm und verbunden an 🤍",
  "Da ist gerade viel Herz da🪄",
  "Nähe und Weichheit dürfen sein💌"
 ],

 "🫠": [
  "Etwas flach gerade — und das ist okay✨",
  "Vielleicht braucht dein System sanfte Aktivierung💪🏼",
  "Ein kleiner Impuls könnte gut tun🪄"
 ],

 "😢": [
  "Das darf gerade schwer sein 🤍",
  "Du musst da nicht allein durch🫂",
  "Diese Gefühle dürfen da sein💞"
 ],

 "😡": [
  "Da ist viel Energie im Raum⚡️",
  "Wut zeigt oft, dass etwas wichtig ist❗️",
  "Atmen — und bewege dich💃🏼"
 ],

 "😒": [
  "Genervt sein ist verständlich🌿",
  "Vielleicht war es gerade viel🫶🏼",
  "Ein kleiner Abstand könnte gut tun🌸"
 ]

}

const moodScore = {

 "🤩": 5,
 "🥰": 5,

 "😄": 5,
 "😊": 4,
 "🧘🏽‍♀️": 4,

 "🫠": 3,

 "😒": 2,

 "😢": 1,
 "😡": 1
}

function scoreLabel(v){

 if(v == null) return "—"

 if(v >= 4.5) return "sehr stabil ☀️"
 if(v >= 3.5) return "ausgeglichen 🌿"
 if(v >= 2.5) return "schwankend 🌫"
 return "belastet 🌧"
}

function saveMood(e){

 if(selectedDate !== todayISO()){
  alert("Mood nur für heute möglich")
  return
 }

 const iso = selectedDate

 moods = moods.filter(m =>
  !(m.date===iso && m.phase===dayPhase()[1])
 )

 moods.push({
  date: iso,
  phase: dayPhase()[1],
  emoji: e
 })

 save("moods",moods)

 // ✅ negative moods → starke affirmation
 if(["😢","😡","😒","🫠"].includes(e)){
   triggerAffirmation("support")
 }
 else {
   triggerAffirmation("neutral")
 }

// alert(moodTextFor(e))
 render()
setTimeout(openStateCheckOverlay, 400)
}

function moodForPhase(phase){
 return moods.find(m =>
  m.date === selectedDate &&
  m.phase === phase
 )
}
 function moodTextFor(emoji){

 const arr = moodTexts[emoji]
 if(!arr) return ""

 return arr[Math.floor(Math.random()*arr.length)]
}

// ========= energy check =========

const energySuggestions = {

 low: {
  text: "Dein System wirkt gerade erschöpft 🤍",
  action: "2-Minuten Reset",
  fn: "startMiniReset"
 },

 mid: {
  text: "Etwas Spannung ist da — wir regulieren sanft 🌿",
  action: "Atemhilfe starten",
  fn: "openPanicOverlay"
 },

 ok: {
  text: "Du hast noch etwas Energie ✨",
  action: "8-Minuten Fokus",
  fn: "startFocusBlock"
 }

}

// ========= task card =========

function taskCard(inst){

 const d = document.createElement("div")

 const task = inst.task || {}

 d.className =
  "task cat-" + (task.category || "default") +
  (done(inst.instance) ? " done" : "")

 d.innerHTML = `

 <div class="taskIcon">
   <i data-lucide="${task.icon || 'circle'}"></i>
 </div>

 <div class="task-main" style="flex:1;margin-left:12px">

 ${(()=>{
  const top = getTopStreaks()
  const hit = top.find(x => x[0] === task.name)

  if(!hit){
   return `<strong>${task.name||"Task"}</strong>`
  }

  const n = hit[1]

  const size =
   n >= 14 ? "11px" :
   n >= 7  ? "12px" :
   "13px"

  const color =
   n >= 14 ? "#ff9800" :
   n >= 7  ? "#ffb300" :
   "#ffd54f"

  return `
  <strong>${task.name}</strong>
  <span style="
    font-size:${size};
    background:${color};
    padding:2px 6px;
    border-radius:10px;
    margin-left:6px;
  ">
  ⭐${n}
  </span>`
 })()}

 <br>
 🕒 ${inst.time}
 </div>

 <button onclick="toggleInstance('${inst.instance}')">✓</button>
 <button onclick="deletePlan('${inst.planId}')">🗑</button>
 `

 const p = plans.find(x=>x.id===inst.planId)

 if(p?.storageLink){
  const main = d.querySelector(".task-main")
  if(main){
   main.style.cursor = "pointer"
   main.onclick = () => openStorageFromTask(p.storageLink)
  }
 }

 setTimeout(()=>lucide.createIcons(), 0)

 return d
}


// ========= HOME =========

function renderHome(){
cleanupOverlays()
 const [greet,phase] = dayPhase()

 const inst = instancesForDate(selectedDate).filter(i=>{
  const [h,m] = i.time.split(":").map(Number)
  return inRange(h,m,...phases[phase])
 })

 const a = getActiveAffirmation()

 app.innerHTML = `
 ${(()=>{
  const s = getTopStreaks()
  if(!s.length) return `<h1>${greet}, ${profile.name}</h1>`

  return `
   <h1>${greet}, ${profile.name}</h1>

   <div class="card" style="font-size:13px">
    ${s.map(x=>`⭐ ${x[0]} — ${x[1]} Tage`).join("<br>")}
   </div>
  `
 })()}

 <div style="display:flex;gap:10px;align-items:center;justify-content:center">
  <button onclick="changeDay(-1)">◀</button>
  <div>${new Date(selectedDate).toLocaleDateString('de-DE')}</div>
  <button onclick="changeDay(1)">▶</button>
 </div>

${a ? `
 <div class="card affirmation">
   ${a}
 </div>
` : ""}

 ${(()=>{
  const m = moodForPhase(phase)

  if(selectedDate !== todayISO()){
   return `<div class="card">Mood nur am aktuellen Tag möglich 🌿</div>`
  }

if(!m){

return `

<h3>Wie fühlst du dich gerade?</h3>
 <div class="moods">
 ${["🤩","😄","😊","🧘🏽‍♀️","🥰","🫠","😢","😡","😒"]
   .map(e=>`<button class="moodBtn" onclick="saveMood('${e}')">${e}</button>`)
   .join("")}
 </div>
`
}

return `
 <div class="card" style="text-align:center">

<div class="moodSaved">${m.emoji}</div>

  <div style="
    margin-top:10px;
    font-size:15px;
    opacity:.85;
    line-height:1.4
  ">
   ${moodTextFor(m.emoji)}
  </div>

  <div style="margin-top:8px;font-size:13px;opacity:.6">
   Mood gespeichert für diese Tageszeit 🌿
  </div>

 </div>
`

 })()}

 <button class="primary" onclick="openPlanDialog()">＋ Task planen</button>

 <button class="panic-float" onclick="openPanicOverlay()">🆘</button>

 <div id="list"></div>
 `

 const list = document.getElementById("list")
 inst.forEach(i=>list.appendChild(taskCard(i)))
}


// ========= DAILY =========

function renderDaily(){

 const inst = instancesForDate(selectedDate)

 const groups = {
  morning:[],
  mid:[],
  evening:[],
  night:[]
 }

 inst.forEach(i=>{
  const [h,m] = i.time.split(":").map(Number)

  if(inRange(h,m,...phases.morning)) groups.morning.push(i)
  else if(inRange(h,m,...phases.mid)) groups.mid.push(i)
  else if(inRange(h,m,...phases.evening)) groups.evening.push(i)
  else groups.night.push(i)
 })

 const s = getTopStreaks()

 app.innerHTML = `
 <h1>Daily 🗓️</h1>

 <div style="display:flex;gap:10px;align-items:center;justify-content:center">
  <button onclick="changeDay(-1)">◀</button>
  <div>${new Date(selectedDate).toLocaleDateString('de-DE')}</div>
  <button onclick="changeDay(1)">▶</button>
 </div>

 ${s.length ? `
 <div class="card" style="font-size:13px">
   ${s.map(x=>`⭐ ${x[0]} — ${x[1]} Tage`).join("<br>")}
 </div>
 ` : ""}
 `

 Object.entries(groups).forEach(([k,v])=>{

  const style = phaseStyle[k]

  const c = document.createElement("div")
  c.className = "card"
  c.style.background = style.bg
  c.style.border = "none"

  c.innerHTML = `<h3>${style.title}</h3>`

  if(!v.length){
   c.innerHTML += `
    <div style="opacity:.5;font-size:13px">
     keine Tasks geplant
    </div>`
  }

  v.forEach(i=>{
   c.appendChild(taskCard(i))
  })

  app.appendChild(c)
 })
}

// ========= CATALOG =========

function renderCatalog(){

 app.innerHTML = `
 <h1>Task Catalog</h1>
 <button class="primary" onclick="newCatalogTask()">＋ Task</button>
 `

 catalog.forEach(t=>{

  const c = document.createElement("div")
  c.className = "card"

  c.innerHTML = `
  <div style="display:flex;align-items:center;gap:12px">

    <div class="taskIcon">
 <i data-lucide="${t.icon || 'circle'}"></i>
</div>

    <div style="flex:1">
      <strong>${t.name}</strong>
    </div>

    <button
      style="font-size:12px;padding:4px 8px"
      onclick="deleteCatalogTask('${t.id}')">
      🗑
    </button>

  </div>
  `

  app.appendChild(c)
 })

setTimeout(()=>lucide.createIcons(),0)
}

function newCatalogTask(){

 const name = prompt("Task Name")
 if(!name) return

 const category = (prompt(
  "Kategorie:\nselfcare, bewegung, haushalt, essen, gesundheit, natur, erfolg, ziele"
 ) || "default").toLowerCase()

 openIconPicker(icon => {

  catalog.push({
   id: uid(),
   name,
   icon,
   category
  })

  save("catalog", catalog)
  renderCatalog()

 })
}

// ========= GOALS =========

function addGoal(goal){
 goals.push(goal)
 save("goals", goals)
}

// ========= GOALS =========

function renderGoals(){

 app.innerHTML = `
 <h1>Ziele ⭐</h1>

 <div style="display:flex;gap:8px">

  <button onclick="openGoalWizard()">
 Neues Ziel +
</button>

  <button onclick="renderGoalsArchive()">
    📂 Archiv
  </button>

 </div>

 <div class="goals-grid" id="goalsGrid"></div>
 `

 const box = document.getElementById("goalsGrid")

 goals
  .filter(g => !g.archived)
  .slice()
  .sort((a,b)=>goalProgress(b)-goalProgress(a))
  .forEach(g=>{
    box.appendChild(goalBubble(g))
  })
setTimeout(()=>lucide.createIcons(),0)

}

function renderGoalsArchive(){

 app.innerHTML = `
 <h1>Archivierte Ziele 📂</h1>

 <button onclick="renderGoals()">⬅ zurück</button>

 <div class="goals-grid" id="goalsGrid"></div>
 `

 const box = document.getElementById("goalsGrid")

 goals
  .filter(g => g.archived)
  .forEach(g=>{
    box.appendChild(goalBubble(g))
  })
}

function goalBubble(g){

const percent = goalProgress(g)

const overdue =
 g.due &&
 percent < 100 &&
 todayISO() > g.due

const color =
 percent >= 100 ? "#ffd54f" :
 overdue ? "#ff6b6b" :
 "#7bd68b"

 const d = document.createElement("div")
d.className = "goal-bubble" + (percent>=100 ? " done" : "")

 d.onclick = () => openGoalDetail(g.id)

 d.innerHTML = `
   <div class="goal-title">${g.name}</div>

<div class="goal-ring-wrap">

 <svg class="goal-ring" viewBox="0 0 120 120">

  <circle
   cx="60" cy="60" r="52"
   class="ring-bg"
  />

  <circle
   cx="60" cy="60" r="52"
   class="ring-fill"
   stroke="${color}"
   stroke-dasharray="327"
   stroke-dashoffset="${327 - 327*percent/100}"
  />

 </svg>

 <div class="goal-center-icon">
  <i data-lucide="${g.icon || 'target'}"></i>
 </div>

</div>

  

   ${g.due && percent < 100 ? `
   <div class="goal-meta-small">
     ${Math.max(0, daysBetween(todayISO(), g.due))} Tage übrig
   </div>
   ` : ""}
`

 if(percent>=100 && !g.completedShown){
  g.completedShown = true
  saveGoals()
  showGoalPop()
 }

 setTimeout(()=>lucide.createIcons(),0)
return d
}

function openGoalDetail(id){

 const g = goals.find(x=>x.id===id)
 if(!g) return

 const percent = goalProgress(g)
 const auto = goalAutoCount(g)
 const manual = g.manual || 0
 const total = auto + manual

 const task = catalog.find(t=>t.id===g.taskId)

 app.innerHTML = `
 <h1>${g.name} ⭐</h1>

 <div class="card goal-detail">

<div class="goal-detail-icon">
 <i data-lucide="${g.icon || 'target'}"></i>
</div>

${(()=>{
 const overdue =
  g.due &&
  percent < 100 &&
  todayISO() > g.due

 const color =
  percent >= 100 ? "#ffd54f" :
  overdue ? "#ff6b6b" :
  "#7bd68b"

 return `
 <div class="goal-big-ring"
  style="
   --p:${percent}%;
   background:conic-gradient(${color} var(--p), #e9ecf5 0);
  ">
   <div>
     <strong>${total}</strong><br>
     <small>/ ${g.target}</small>
   </div>
 </div>
 `
})()}

   <div class="goal-count">
     Fortschritt: <strong>${total}</strong> / ${g.target}
   </div>

   ${task ? `
   <div class="goal-link">
     Verknüpfter Task:<br>
     <strong>${task.name}</strong>
   </div>
   ` : ""}

   <div class="goal-meta">
     Start: ${new Date(g.start).toLocaleDateString('de-DE')}
   </div>

${g.due ? `
<div class="goal-meta">
 Ziel bis: ${new Date(g.due).toLocaleDateString('de-DE')}
</div>
` : ""}

   ${g.why ? `
   <div class="goal-block">
     <h3>Warum</h3>
     ${g.why}
   </div>
   ` : ""}

   ${g.note ? `
   <div class="goal-block">
     <h3>Notizen</h3>
     ${g.note}
   </div>
   ` : ""}

   <div class="goal-stats">
     Auto: ${auto} • Manuell: ${manual}
   </div>

 </div>

 <button class="primary"
  onclick="goalAddManual('${g.id}')">
  ＋ Manuell zählen
 </button>

<button onclick="renderGoals()">⬅ zurück</button>
<button onclick="openGoalEdit('${g.id}')">✏️ bearbeiten</button>

${!g.archived ? `
<button onclick="archiveGoal('${g.id}')">
 📂 archivieren
</button>
` : ""}


 <button onclick="deleteGoal('${g.id}')">🗑 löschen</button>
 `
}

function goalAddManual(id){

 const g = goals.find(x=>x.id===id)
 if(!g) return

 g.manual = (g.manual || 0) + 1
 saveGoals()
 openGoalDetail(id)
}

function goalCurrentValue(g){

 let v = g.manual || 0

 // Task linked → über logs + goalAutoCount
 if(g.taskId){
  v += goalAutoCount(g)
 }

 // Metric linked
 if(g.metricKey && g.metricHits){
  v += g.metricHits.length
 }

 return v
}

function goalPercent(g){
 if(!g.target) return 0
 const cur = goalCurrentValue(g)
 return Math.min(100, Math.round((cur / g.target) * 100))
}

// ========= PLAN DIALOG UI =========

function openPlanDialog(){
 renderPlanDialog("")
}

function renderPlanDialog(filter){

 app.innerHTML = `
 <h1>Task planen ✅</h1>

 <div class="card">
   <input id="searchTask" placeholder="Task suchen..."
     value="${filter||""}"
     oninput="renderPlanDialog(this.value)">
 </div>

 <div id="catList"></div>

 <button class="primary" onclick="renderCreateTask()">
   Neuer Task
 </button>

<button onclick="page='home'; render()">⬅ Zurück</button>

 `

 const box = document.getElementById("catList")

 catalog
  .filter(t =>
    !filter ||
    t.name.toLowerCase().includes(filter.toLowerCase())
  )
  .forEach(t=>{

    const d = document.createElement("div")
    d.className="card"
  d.innerHTML = `
<div style="display:flex;align-items:center;gap:12px">

<div class="taskIcon">
 <i data-lucide="${t.icon || 'circle'}"></i>
</div>

<div style="flex:1">
  <strong>${t.name}</strong>
</div>

<button onclick="openPlanForm('${t.id}')">
 auswählen
</button>

</div>
`

    box.appendChild(d)
  })

setTimeout(()=>lucide.createIcons(),0)

}

function renderCreateTask(){

 const name = prompt("Task Name")
 if(!name) return

 const taskId = uid()

 const category = (prompt(
  "Kategorie:\nselfcare, bewegung, haushalt, essen, gesundheit, natur, erfolg, ziele"
 ) || "default").toLowerCase().trim()

 openIconPicker(icon => {

  catalog.push({
   id: taskId,
   name,
   icon: icon || "circle",
   category
  })

  save("catalog", catalog)

  renderPlanDialog("")

 })

}

// ========= CREATE TASK FROM PLAN DIALOG =========



function render(){

 // nur alte goal-pop entfernen — modals NICHT hart killen
 document.querySelectorAll(".goal-pop")
  .forEach(e => e.remove())

 if(page==="home") renderHome()
 else if(page==="daily") renderDaily()
 else if(page==="catalog") renderCatalog()
 else if(page==="categories") renderCategories()
 else if(page==="goals") renderGoals()
 else if(page==="settings") renderSettings()
 else app.innerHTML="<h1>Kommt bald ✨</h1>"

 setTimeout(()=>lucide.createIcons(),0)
}

// =====================
// PLAN MODAL UI
// =====================

function openPlanForm(taskId){

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

 <h2>Task planen</h2>

<label>Startdatum</label>
<input type="date" id="planDate" value="${todayISO()}">

<label>Uhrzeit</label>
<input type="time" id="planTime"
 value="${new Date().toTimeString().slice(0,5)}">

<label>Intervall</label>

<select id="planInterval" onchange="toggleEveryX()">
<option value="once">einmalig</option>
<option value="daily">täglich</option>
<option value="weekly">wöchentlich</option>
<option value="monthly">monatlich</option>
<option value="everyX">alle X Tage</option>
</select>

<label style="margin-top:10px;display:block">
<input type="checkbox" id="planStreak">
 zählt als Erfolg ⭐
</label>

<div id="everyXBox" style="display:none">
<label>Alle X Tage</label>
<input type="number" id="everyXInput" value="3">
</div>

<button class="primary"
 onclick="savePlanForm('${taskId}')">
Speichern
</button>

<button onclick="closeModal()">
Abbrechen
</button>

</div>
`

 document.body.appendChild(modal)

 lucide.createIcons()   // ← wichtig
}

function toggleEveryX(){
 const v = document.getElementById("planInterval").value
 document.getElementById("everyXBox").style.display =
  v==="everyX" ? "block" : "none"
}

function toggleMetricRepeatBox(){

 const v =
  document.getElementById("goalMetricRepeat").value

 document.getElementById("goalMetricEveryXBox")
  .style.display = v==="everyX" ? "block" : "none"
}

function closeModal(){

 document
  .querySelectorAll(".modal")
  .forEach(m => m.remove())

 document.body.style.pointerEvents = "auto"
}

// ========= GOAL CREATE =========

function openGoalCreate(){

 app.innerHTML = `

<h1>Neues Ziel 🌱</h1>

<div class="card compact">

<label>Ziel</label>
<input id="goalName"
 placeholder="z.B. 10x Sport">

<label>Beschreibung</label>
<textarea id="goalWhy"
 rows="2"
 placeholder="optional"></textarea>

</div>


<div class="card compact">

<div class="row2">

 <div>
  <label>Start ab</label>
  <input id="goalStart" type="date">
 </div>

 <div>
  <label>Bis</label>
  <input id="goalDue" type="date">
 </div>

</div>

</div>


<div class="card compact">

<label>Zielart</label>
<select id="goalMode">
 <option value="count">Anzahl Aktionen</option>
 <option value="metric">Metric Wert</option>
</select>

<label>Anzahl / Zielwert</label>
<input id="goalTarget"
 type="number"
 placeholder="z.B. 10">

<label>Rhythmus</label>
<select id="goalRhythm">
 <option value="any">ohne festen Rhythmus</option>
 <option value="daily">täglich</option>
 <option value="weekly">wöchentlich</option>
 <option value="until">bis Zieldatum</option>

</select>

</div>

<button onclick="openIconPicker(goalCreateIconPickHandler)">
Icon wählen
</button>

<div id="goalIconPreview"></div>

<div class="card compact">

<label>Task verknüpfen (optional)</label>
<select id="goalTask">
<option value="">—</option>
${
 catalog.map(t =>
  `<option value="${t.id}">${t.name}</option>`
 ).join("")
}
</select>

<label>Metric verknüpfen (optional)</label>
<select id="goalMetric">
<option value="">—</option>
${
 metricDefs.map(m =>
  `<option value="${m.key}">
   ${m.label}
  </option>`
 ).join("")
}
</select>

</div>


<button class="primary"
 onclick="saveGoalCreate()">
Speichern
</button>

<button onclick="renderGoals()">
Abbrechen
</button>
`

setTimeout(()=>lucide.createIcons(),0)

}

// ======================
// GOAL WIZARD
// ======================

let goalDraft = {}

function openGoalWizard(){
 goalDraft = {}
 goalWizardStep1()
}


// ---------- STEP 1 ----------

function goalWizardStep1(){

 app.innerHTML = `

<h1>Ziel 🌱</h1>

<div class="card compact">

<label>Ziel</label>
<input id="wizName"
 placeholder="z.B. 10x Sport">

<label>Beschreibung</label>
<textarea id="wizWhy"
 rows="2"
 placeholder="optional"></textarea>

</div>

<button class="primary"
 onclick="goalWizardStep2()">
Weiter
</button>

<button onclick="renderGoals()">
Abbrechen
</button>

`
}


// ---------- STEP 2 ----------

function goalWizardStep2(){

 goalDraft.name = wizName.value.trim()
 goalDraft.why = wizWhy.value || ""

 if(!goalDraft.name){
  alert("Ziel fehlt")
  return
 }

 app.innerHTML = `

<h1>Zeitraum & Zielwert</h1>

<div class="card compact">

<div class="row2">

 <div>
  <label>Start</label>
  <input id="wizStart" type="date"
   value="${todayISO()}">
 </div>

 <div>
  <label>Bis</label>
  <input id="wizDue" type="date">
 </div>

</div>

</div>

<div class="card compact">

<label>Zielart</label>
<select id="wizMode">
 <option value="count">Anzahl Aktionen</option>
 <option value="metric">Metric Wert</option>
</select>

<label>Anzahl / Zielwert</label>
<input id="wizTarget"
 type="number"
 placeholder="z.B. 10">

<label>Rhythmus</label>
<select id="wizRhythm">
 <option value="any">ohne festen Rhythmus</option>
 <option value="daily">täglich</option>
 <option value="weekly">wöchentlich</option>
 <option value="until">bis Zieldatum</option>
</select>

</div>

<button class="primary"
 onclick="goalWizardStep3()">
Weiter
</button>

<button onclick="goalWizardStep1()">
⬅ zurück
</button>

`
}


function goalWizardStep3(){

 goalDraft.start = wizStart.value || todayISO()
 goalDraft.due = wizDue.value || null
 goalDraft.mode = wizMode.value
 goalDraft.target = parseInt(wizTarget.value,10) || 1
 goalDraft.rhythm = wizRhythm.value || "any"

 app.innerHTML = `

<h1>Verknüpfungen</h1>

<div class="card compact">

<label>Task (optional)</label>
<select id="wizTask">
<option value="">—</option>
${
 catalog.map(t =>
  `<option value="${t.id}">${t.name}</option>`
 ).join("")
}
</select>

<label>Metric (optional)</label>
<select id="wizMetric">
<option value="">—</option>
${
 metricDefs.map(m =>
  `<option value="${m.key}">${m.label}</option>`
 ).join("")
}
</select>

</div>

<button onclick="openIconPicker(goalIconPickHandler)">
Icon wählen
</button>

<div id="wizIconPrev"></div>

<button class="primary"
 onclick="
 goalDraft.taskId = wizTask.value || null;
 goalDraft.metricKey = wizMetric.value || null;
 finishGoalWizard();
">
Ziel speichern
</button>

<button onclick="goalWizardStep2()">
⬅ zurück
</button>

`

 setTimeout(()=>lucide.createIcons(),0)
}




// ---------- FINISH ----------

function finishGoalWizard(){

 const goal = {
  id: uid(),
  name: goalDraft.name,
  target: goalDraft.target,
  start: goalDraft.start,
  due: goalDraft.due,
  why: goalDraft.why,
  note: goalDraft.note,
  taskId: goalDraft.taskId || null,
  manual: 0,
  archived: false,
  icon: pickedGoalIcon || "target"
 }

 goals.push(goal)
 save("goals", goals)

 cleanupOverlays()
 renderGoals()
}

function toggleAffirmations(off){
 settings.affirmationsOff = off
 save("settings", settings)
 render()
}

function saveGoalCreate(){

 const goal = {

  id: uid(),

  name: goalName.value.trim(),

  why: goalWhy.value || "",

  start: goalStart.value || todayISO(),
  due: goalDue.value || null,

  mode: goalMode.value,
  target: parseInt(goalTarget.value,10) || 1,

  rhythm: goalRhythm.value || "any",

  taskId: goalTask.value || null,
  metricKey: goalMetric.value || null,

icon: pickedGoalIcon || "target",

 }

 goals.push(goal)

 save("goals", goals)

 renderGoals()
}

// ===== HARD RESET BUTTON =====

function renderSettings(){

 app.innerHTML = `
 <h1>Settings ⚙️</h1>

<!-- PROFIL -->
<div class="card">
  <h3>Profil</h3>

  <input
 id="setName"
   placeholder="Name"
   value="${profile.name}">

  <input id="setYear"
   type="number"
   placeholder="Geburtsjahr"
   value="${profile.birthYear||""}">

  <button onclick="saveProfile()">Speichern</button>

<label>
<input type="checkbox"
 id="affirmToggle"
 ${settings.affirmationsOff ? "checked":""}
 onchange="toggleAffirmations(this.checked)">
 Affirmationen deaktivieren
</label>

</div>

<div class="card">
  <h3>Mood Analyse</h3>

  <button class="primary"
    onclick="openMoodInsights()">
    Analyse öffnen
  </button>

</div>

${metricDefs.find(m=>m.key==="pregnancy") ? `
<div class="card">
  <h3>Schwangerschaft</h3>

  <input type="date"
   id="pregDate"
   value="${pregnancyStart||""}">

  <button onclick="savePregnancyStart()">
    speichern
  </button>

  ${pregnancyWeek() ? `
    <div>🤰 Woche ${pregnancyWeek()}</div>
  ` : ""}

</div>
` : ""}

 ${metricDefs.find(m=>m.key==="cycle") ? `
<div class="card">
  <h3>Zyklus</h3>

  <input type="date" id="cycleDate">

  <button onclick="addCycleStart()">
    Periode Start speichern
  </button>

  ${currentCycleDay() ? `
    <div>Zyklustag ${currentCycleDay()}</div>
  ` : ""}

  <button onclick="openCycleInsights()">
    📊 Zyklus Infos
  </button>

</div>
` : ""}



<!-- METRICS -->
<div class="card">
  <h3>Metrics</h3>

  <div class="metric-grid">
    ${metricDefs.map(m =>
      metricRow(m.key, m.label, m.unit)
    ).join("")}
  </div>

  <button class="primary"
   onclick="openMetricPresetPicker()">
   + Neu hinzufügen
  </button>
</div>

<!-- RESET BUTTON klein in Ecke -->
<div style="
 position:fixed;
 bottom:8px;
 right:10px;
 opacity:.35;
 font-size:11px;
">
<button onclick="hardResetSafe()"
 style="
  background:none;
  border:none;
  text-decoration:underline;
  cursor:pointer;
 ">
 reset
</button>
</div>

`
}



function metricRow(key,label,unit){

 const last = lastMetricValue(key)

 return `
 <div class="metric-card">

  <div class="metric-head">

    <input value="${label}"
     onchange="renameMetric('${key}',this.value)"
     class="metric-label">

    <div class="metric-actions">

      ${last ? `
      <button class="miniBtn"
       onclick="openMetricHistory('${key}', '${unit || ""}')">
       📈
      </button>` : ""}

      <button class="miniDel"
       onclick="deleteMetricDef('${key}')">
       🗑
      </button>

    </div>
  </div>

  <div class="metric-last">
   ${last ? last.value+" "+unit : "📭 noch kein Eintrag"}
  </div>

  <div class="metric-input-row">
    <input id="metric_${key}"
     placeholder="neuer Wert">

    <button onclick="saveMetricInput('${key}')">
     speichern
    </button>
</div>

 </div>
 `
}

function renameMetric(key,newLabel){

 const m = metricDefs.find(x=>x.key===key)
 if(!m) return

 m.label = newLabel.trim() || m.label
 save("metricDefs", metricDefs)
}

 

function showGoalPop(){

 const d = document.createElement("div")
 d.className = "goal-pop"

 d.innerHTML = `
 <div class="goal-pop-box">

  <div class="goal-pop-emoji">⭐</div>

  <div class="goal-pop-title">
   Ziel erreicht
  </div>

  <div class="goal-pop-text">
   Das hast du dir verdient 🤍
  </div>

 </div>
 `

 document.body.appendChild(d)

 setTimeout(()=>d.remove(), 2600)
}

 function createTaskFromCategoryItem(name, catId, subId, itemId){

 openPlanFormStorage({
  name,
  catId,
  subId,
  itemId
 })
}

function saveMetricInput(key){

 const el = document.getElementById("metric_"+key)

 const raw = el.value
 if(!raw) return

 const num = Number(raw.replace(",","."))
 addMetricValue(key, isNaN(num) ? raw : num)

 // 🔥 Metric Goals prüfen
 checkMetricGoalTriggers()

 renderSettings()
}

function checkMetricGoalTriggers(){

 const today = todayISO()

 goals.forEach(g=>{

  if(!g.metricKey) return

if(!g.metricHits) g.metricHits = []

  // einmalige Goals nicht nochmal triggern

if(g.metricRepeat === "once" && g.metricHits && g.metricHits.length)

    return

  const lastEntry = lastMetricValue(g.metricKey)
if(!lastEntry) return

const v = Number(lastEntry.value)
if(isNaN(v)) return

let pass = false

if(g.metricMode === "gte")
 pass = v >= g.metricTarget

if(g.metricMode === "lte")
 pass = v <= g.metricTarget

  if(!pass) return

  // ---------- once ----------
  if(g.metricRepeat === "once"){
    g.percent = 100
    return
  }

  // ---------- daily ----------
  if(g.metricRepeat === "daily"){

    if(!g.metricHits.includes(today)){
      g.metricHits.push(today)
      g.percent = 100
    }

    return
  }

  // ---------- every X ----------
  if(g.metricRepeat === "everyX"){

    if(!g.metricEveryX) return

    const lastHit =
      g.metricHits[g.metricHits.length-1]

    if(!lastHit){
      g.metricHits.push(today)
      g.percent = 100
      return
    }

    const diff =
     (new Date(today)-new Date(lastHit)) / 86400000

    if(diff >= g.metricEveryX){
      g.metricHits.push(today)
      g.percent = 100
    }

  }

 })

 save("goals", goals)
}

function openMetricHistory(key, unit){

 const arr = metrics[key] || []

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

<h3>${metricDefs.find(m=>m.key===key)?.label || key} Verlauf</h3>

${arr.map((x,i)=>`
 ${x.date} — ${x.value} ${unit}
 <button onclick="deleteMetricEntry('${key}',${i})">🗑</button>
`).join("<br>")}

  <canvas id="metricChart" height="160"></canvas>

  <button onclick="closeModal()">schließen</button>
 </div>
 `

 document.body.appendChild(modal)

 drawMetricChart(arr)
}


function drawMetricChart(arr){

 arr = arr.slice().sort((a,b)=>a.date.localeCompare(b.date))
 if(arr.length < 2) return

 const c = document.getElementById("metricChart")
 if(!c) return

 const ctx = c.getContext("2d")

 const values = arr
  .map(x => Number(x.value))
  .filter(v => !isNaN(v))

 if(values.length < 2) return

 const pad = 30
 const min = Math.min(...values)
 const max = Math.max(...values)
 const range = (max-min) || 1

const w = c.width = 300
const h = c.height = 160

 ctx.clearRect(0,0,w,h)

 // Linie zeichnen
 ctx.beginPath()

 values.forEach((v,i)=>{

  const px = pad + i/(values.length-1)*(w-pad*2)
  const py = h-pad - ((v-min)/range)*(h-pad*2)

  if(i === 0) ctx.moveTo(px,py)
  else ctx.lineTo(px,py)
 })

 ctx.stroke()

 // ✅ Punkte zeichnen — HIER gehört dein Block hin
 values.forEach((v,i)=>{

  const px = pad + i/(values.length-1)*(w-pad*2)
  const py = h-pad - ((v-min)/range)*(h-pad*2)

  ctx.beginPath()
  ctx.arc(px,py,5,0,Math.PI*2)
  ctx.fill()
 })

}

 // ---------- Punkte ----------


function deleteMetricEntry(key,index){

 if(!confirm("Wert löschen?")) return

 metrics[key].splice(index,1)
 save("metrics", metrics)

 closeModal()
 openMetricHistory(key,
  metricDefs.find(m=>m.key===key)?.unit || ""
 )
}

function openPlanFormStorage(storage){

tempStoragePlan = storage

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

 <h2>${storage.name} planen</h2>

 <label>Startdatum</label>
 <input type="date" id="planDate" value="${todayISO()}">

 <label>Uhrzeit</label>
 <input type="time" id="planTime"
 value="${new Date().toTimeString().slice(0,5)}">

 <label>Intervall</label>
 <select id="planInterval">
  <option value="once">einmalig</option>
  <option value="daily">täglich</option>
 </select>

 <button class="primary"
onclick="saveStoragePlanFromModal()">
 Speichern
 </button>

 <button onclick="closeModal()">Abbrechen</button>

 </div>
 `

 document.body.appendChild(modal)
}

function saveStoragePlan(storage){

const time = document.getElementById("planTime").value

 const interval = document.getElementById("planInterval").value
 const startDate =
  document.getElementById("planDate").value || todayISO()

 plans.push({
  id: uid(),
  taskId: null,          // ← wichtig
  storageLink: storage,  // ← hier liegt die Verbindung
  times: [time],
  interval,
  everyX:1,
  start: startDate,
  success:false
 })

save("plans",plans)

closeModal()
render()

}

function openStorageFromTask(link){

 const cat = categories.find(c=>c.id===link.catId)
 const sub = cat?.children.find(s=>s.id===link.subId)
 const item = sub?.items.find(i=>i.id===link.itemId)

 if(!item){
  alert("Eintrag nicht gefunden")
  return
 }

 const modal = document.createElement("div")
 modal.className="modal"

 modal.innerHTML = `
 <div class="modal-box">

 <h3>${item.name}</h3>

 ${item.type==="text" ? item.text : ""}
 ${item.type==="link" ? `<a href="${item.link}" target="_blank">${item.link}</a>` : ""}

 <button onclick="closeModal()">schließen</button>

 </div>
 `

 document.body.appendChild(modal)
}

function saveStoragePlanFromModal(){
 saveStoragePlan(tempStoragePlan)
}

function openGoalEdit(id){

 const g = goals.find(x=>x.id===id)
 if(!g) return

 openGoalCreate()

pickedGoalIcon = g.icon || "target"

setTimeout(()=>{
 const p = document.getElementById("goalIconPreview")
 if(p){
  p.innerHTML = `<i data-lucide="${pickedGoalIcon}"></i>`
  lucide.createIcons()
 }
}, 0)

 goalName.value = g.name
 goalMode.value = g.mode || "count"
goalTarget.value = g.target || 1

if(g.rhythm){
 document.getElementById("goalRhythm").value = g.rhythm
}
 goalDue.value = g.due || ""
 goalWhy.value = g.why || ""
 goalNote.value = g.note || ""
 goalStart.value = g.start || todayISO()

 if(g.taskId){
  goalTask.value = g.taskId
 }

 const btn = document.querySelector(".primary")

 btn.onclick = () => {

  g.name = goalName.value.trim()
  g.target = parseInt(goalTarget.value,10) || 1
  g.mode = goalMode.value
  g.due = goalDue.value || null
  g.why = goalWhy.value || ""
  g.note = goalNote.value || ""
  g.taskId = goalTask.value || null
  g.start = goalStart.value || todayISO()

  // 🔥 Bildspeicherung deaktiviert
  // g.img bleibt unverändert

  // Icon speichern
  g.icon = pickedGoalIcon || g.icon || "target"

  saveGoals()
  cleanupOverlays()
  render()
  openGoalDetail(id)
 }

}


function openCycleInsights(){

 const stats = cycleStats()
 const hist = cycleHistoryList()

 app.innerHTML = `
 <h1>Zyklus Analyse 🌸</h1>

 <button onclick="renderSettings()">⬅ zurück</button>

 ${stats ? `
 <div class="card">
  <h3>Statistik</h3>
  Durchschnitt: ${stats.avg} Tage<br>
  Minimum: ${stats.min}<br>
  Maximum: ${stats.max}
 </div>
 ` : `
 <div class="card">
  Noch zu wenige Daten
 </div>
 `}

 ${hist.length ? `
 <div class="card">
  <h3>Letzte Zyklen</h3>
  ${hist.map(x=>`
   ${new Date(x.from).toLocaleDateString('de-DE')}
   → ${new Date(x.to).toLocaleDateString('de-DE')}
   = <strong>${x.len} Tage</strong>
  `).join("<br>")}
 </div>
 ` : ""}

 ${renderMoodVsCycleBlock()}
 `
}

function renderMoodVsCycleBlock(){

 if(!cycleStarts.length || !moods.length) return ""

 const map = {}

 moods.forEach(m=>{
  const day = cycleDayForDate(m.date)
  if(!day) return
  if(!map[day]) map[day]=[]
  map[day].push(m.emoji)
 })

 const rows = Object.entries(map)
  .sort((a,b)=>a[0]-b[0])
  .map(([day,arr])=>
    `Tag ${day} → ${scoreLabel(avgMoodScore(arr))}`
  )
  .join("<br>")

 return `
 <div class="card moodClickable"
  onclick="openMoodCycleDetail()">
  <h3>Mood vs Zyklus</h3>
  ${rows}
 </div>
 `
}

function cycleDayForDate(date){

 if(!cycleStarts.length) return null

 const starts = cycleStarts.slice().sort()

 let last = null

 for(const s of starts){
  if(s <= date) last = s
 }

 if(!last) return null

 return daysBetween(last, date) + 1
}

function openMoodInsights(){

 const total = moods.length

 if(!total){
  app.innerHTML = `
  <h1>Deine Mood Muster</h1>

  <button onclick="renderSettings()">⬅ zurück</button>

  <div class="card">Noch keine Daten vorhanden</div>
  `
  return
 }

 const counts = {}
 moods.forEach(m=>{
  counts[m.emoji] = (counts[m.emoji]||0)+1
 })

 const best =
  Object.entries(counts)
   .sort((a,b)=>b[1]-a[1])[0]

 app.innerHTML = `
 <h1>Deine Mood Muster</h1>

 <button onclick="renderSettings()">⬅ zurück</button>

 ${renderMoodBarChart()}
 ${renderMoodHeatmap()}

 <div class="card moodHero">
  <div class="moodHeroEmoji">${best[0]}</div>
  <div>
   Häufigster Mood<br>
   <span>${best[1]} Einträge</span>
  </div>
 </div>

 <div class="card moodClickable"
  onclick="openMoodTextDetail()">
  ${moodInsightText()}
 </div>

 <div class="card moodClickable"
  onclick="openMoodDistributionDetail()">
  <h3>Verteilung</h3>
  <div class="moodChipRow">
   ${moodDistributionUI(counts)}
  </div>
 </div>

 <div class="card moodClickable"
  onclick="openMoodPhaseDetail()">
  <h3>Tageszeit Muster</h3>
 </div>

 <div class="card moodClickable"
  onclick="openMoodTrendDetail()">
  <h3>Wochen Trend</h3>
 </div>
 `
}

function moodPhaseBlock(){

 const map = {}

 moods.forEach(m=>{
  if(!map[m.phase]) map[m.phase]=[]
  map[m.phase].push(m.emoji)
 })

 return `
 <div class="card moodClickable"
  onclick="openMoodPhaseDetail()">
  <h3>Tageszeiten</h3>

  ${Object.entries(map).map(([p,arr])=>
   `${p} → ${scoreLabel(avgMoodScore(arr))}`
  ).join("<br>")}

 </div>
 `
}

function moodWeeklyTrendBlock(){

 const map = {}

 moods.forEach(m=>{
  const w = getWeekNumber(new Date(m.date))
  if(!map[w]) map[w]=[]
  map[w].push(m.emoji)
 })

 const rows = Object.entries(map)
  .sort((a,b)=>a[0]-b[0])
  .map(([w,arr])=>
   `Woche ${w} → ${scoreLabel(avgMoodScore(arr))}`
  )
  .join("<br>")

 return `
 <div class="card moodClickable"
  onclick="openMoodTrendDetail()">
  <h3>Wochen Trend</h3>
  ${rows}
 </div>
 `
}

function mostCommon(arr){
 const c={}
 arr.forEach(x=>c[x]=(c[x]||0)+1)
 return Object.entries(c)
  .sort((a,b)=>b[1]-a[1])[0][0]
}

function avgMoodScore(arr){

 const vals = arr
  .map(e => moodScore[e])
  .filter(x => x)

 if(!vals.length) return null

 return vals.reduce((a,b)=>a+b,0)/vals.length
}

function renderMoodHeatmap(){

 const last = moods.slice(-28)
 if(!last.length) return ""

 return `
 <div class="card">

 <h3>Mood Heatmap</h3>

 <div class="heatGrid">

 ${last.map(m=>{

  const s = moodScore[m.emoji] || 3

  return `
   <div class="heatCell"
     style="background:${moodColor(s)}"
     title="${new Date(m.date).toLocaleDateString('de-DE')} • ${m.emoji}">
   </div>
  `

 }).join("")}

 </div>

 ${renderHeatLegend()}

 </div>
 `
}

function renderHeatLegend(){

 return `
 <div style="
   margin-top:10px;
   font-size:12px;
   opacity:.7;
   display:flex;
   justify-content:space-between;
   gap:6px">

   <span>niedrig</span>
   <span>leicht</span>
   <span>neutral</span>
   <span>gut</span>

 </div>
 `
}

function openMetricPresetPicker(){

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box" style="max-height:70vh;overflow:auto">

 <h3>Metric hinzufügen</h3>

 ${metricPresets.map(m=>`

  <div class="card"
   style="cursor:pointer"
   onclick="addMetricPreset('${m.key}')">

   ${m.label} (${m.unit})

  </div>

 `).join("")}

 <div class="card"
  style="cursor:pointer"
  onclick="openCustomMetricDialog()">

  ➕ Eigene erstellen

 </div>

 <button onclick="closeModal()">abbrechen</button>

 </div>
 `

 document.body.appendChild(modal)
}

function addMetricPreset(key){

 const p = metricPresets.find(x=>x.key===key)
 if(!p) return

 if(metricDefs.find(x=>x.key===key)){
  alert("Schon vorhanden")
  return
 }

 metricDefs.push({...p})
 save("metricDefs", metricDefs)

 closeModal()   // ✅ kein renderSettings
}

function openCustomMetricDialog(){

 const modal = document.createElement("div")
 modal.className = "modal"

 modal.innerHTML = `
 <div class="modal-box">

 <h3>Eigene Metric</h3>

 <input id="customMetricName"
  placeholder="Name">

 <input id="customMetricUnit"
  placeholder="Einheit (optional)">

 <button class="primary"
  onclick="saveCustomMetric()">
  Speichern
 </button>

 <button onclick="closeModal()">
  Abbrechen
 </button>

 </div>
 `

 document.body.appendChild(modal)
}

function saveCustomMetric(){

 const name =
  document.getElementById("customMetricName").value.trim()

 const unit =
  document.getElementById("customMetricUnit").value.trim()

 if(!name){
  alert("Name fehlt")
  return
 }

const key = name.toLowerCase().replace(/\s+/g, "_")

 if(metricDefs.find(m=>m.key===key)){
  alert("Schon vorhanden")
  return
 }

 metricDefs.push({key,label:name,unit})

 save("metricDefs", metricDefs)

 closeModal()
}

function deleteMetricDef(key){

 if(!confirm("Metric löschen?")) return

 metricDefs = metricDefs.filter(m=>m.key !== key)

 delete metrics[key]

 save("metricDefs", metricDefs)
 save("metrics", metrics)

 renderSettings()
}

// ===== mood detail safe =====

function renderMoodBarChart(){
 return `<div class="card">Chart folgt</div>`
}

function moodColor(score){
 if(score <= 2) return "#ffd6d6"
 if(score === 3) return "#fff3cd"
 return "#d6f5dd"
}

function moodInsightText(){
 return "Analyse wird aufgebaut…"
}

function moodDistributionUI(counts){
 return Object.entries(counts)
  .map(([e,n])=>`${e} ${n}`)
  .join(" ")
}

function openMoodPhaseDetail(){
 alert("Phase Detail folgt")
}

function openMoodTrendDetail(){
 alert("Trend Detail folgt")
}

function openMoodTextDetail(){
 alert("Text Detail folgt")
}

function openMoodDistributionDetail(){
 alert("Distribution Detail folgt")
}

function openMoodCycleDetail(){
 alert("Cycle Detail folgt")
}

function savePlanForm(taskId){

const time = document.getElementById("planTime")?.value || "09:00"

 const date = document.getElementById("planDate").value || todayISO()
 const interval = document.getElementById("planInterval").value
 const streak = document.getElementById("planStreak")?.checked || false

 const everyX =
  interval === "everyX"
   ? parseInt(document.getElementById("everyXInput").value,10) || 1
   : 1

 plans.push({
  id: uid(),
  taskId,
  times: [time],
  interval,
  everyX,
  start: date,
  success: streak
 })

 save("plans", plans)

 closeModal()
 render()
}

function selectGoalIcon(name){
 pickedGoalIcon = name
 closeModal()
 renderGoals()
 setTimeout(()=>lucide.createIcons(),0)
}



document.addEventListener("DOMContentLoaded", () => {

 app = document.getElementById("app")

 document.querySelectorAll(".tabbar button")
 .forEach(btn=>{
  btn.onclick = ()=>{
   page = btn.dataset.page
   render()
  }
 })

 render()
})