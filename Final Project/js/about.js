document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    let currentIndex = 0;
    
    function showNextMember() {
        teamMembers.forEach(member => {
            member.classList.remove('active');
        });
        
        currentIndex = (currentIndex + 1) % teamMembers.length;
        
        setTimeout(() => {
            teamMembers[currentIndex].classList.add('active');
        }, 300);
    }
    
    setInterval(showNextMember, 3000);
    
    let teamContainer = document.querySelector('.team-container');
    teamContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    teamContainer.addEventListener('mouseleave', () => {
        intervalId = setInterval(showNextMember, 3000);
    });
    
    let intervalId = setInterval(showNextMember, 3000);
});