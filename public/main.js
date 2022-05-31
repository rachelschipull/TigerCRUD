//const { response } = require("express")

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: 'Tiny',
        type: 'Tiger'
    })
})
.then(res => {
    if (res.ok) return res.json()
})
.then(response => {
    window.location.reload(true)
})
})

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    type: 'Tiger'
  })
})
.then(res => {
    if (res.ok) return res.json()
})
.then(response => {
    if (response === 'No quote to delete') {
        messageDiv.textContent = 'There are no tigers left. =('
      } else {
        window.location.reload(true)
      }
  })
.catch(console.error)
})