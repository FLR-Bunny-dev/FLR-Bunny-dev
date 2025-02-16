// Dynamic Skills Title
const skills = ["Gamer", "Web Developer", "Photo Editor", "Video Editor", "Hacker"];
let skillIndex = 0;

function changeSkill() {
    const skillElement = document.getElementById("dynamic-skill");
    if (skillElement) {
        skillElement.textContent = skills[skillIndex];
        skillIndex = (skillIndex + 1) % skills.length;
    }
}

setInterval(changeSkill, 3000); // Change skill every 3 seconds
