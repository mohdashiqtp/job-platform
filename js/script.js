document.querySelector('.button').addEventListener("click",()=>{
    
    let text=document.getElementById('filter-jobs').value;
    
    getJobs().then(jobs=>{
       let filteredJobs=filterJobs(jobs,text)
       showJobs(filteredJobs)
       
    })
})


function getJobs(){
    return fetch("data.json").then(responce => responce.json().then(data =>{
        return data;
    }))
}
function filterJobs(jobs,text){
    
    if(text){
        let filteredJobs=jobs.filter(job=>{
            if(job.roleName.toLowerCase().includes(text)||
            job.type.toLowerCase().includes(text)||
            job.location.toLowerCase().includes(text)
            || job.requirements.content.toLowerCase().includes(text)
            || job.company.toLowerCase().includes(text) ){
                return true;
            }else{
                return false;
            }
        })
        return filteredJobs;
    }else{
        return jobs;
    }
    
}

function showJobs(jobs){
      let jobsContainer = document.querySelector(".jobs-container");
      let jobsHTML = "";
      jobs.forEach(job =>{
          jobsHTML +=`<div class="jobs-tile">
          <div class="top">
              <img src="${job.logo}">
              <span class="material-icons more_horiz">more_horiz</span>

          </div>
          <div class="rolename">
            <span>${job.roleName}</span>
          </div>
          <div class="description">
              <span>${job.requirements.content}</span>
          </div>
          <div class="buttons">
              <div class="buttone apply-now">
                  Apply now
              </div>
              <div class="buttone massege">
                  Massege
              </div>
          </div>
      </div>`
      })
      jobsContainer.innerHTML=jobsHTML;
      
}


getJobs().then(data =>{
    showJobs(data)
      
});