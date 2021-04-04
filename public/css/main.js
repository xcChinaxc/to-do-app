const update = document.querySelector('#update-bttn')

update.addEventListener('click', _ => {
    fetch('/tasks', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskName: 'complete',
          })
    })
})