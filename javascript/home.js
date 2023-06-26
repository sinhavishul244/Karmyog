const getTask = async () => {
    try {
        const res = await fetch("https://vishultodoapis.onrender.com/tasks/all");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

getTask();