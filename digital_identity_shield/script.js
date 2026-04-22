document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Find matching content and make it active
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            } else {
                // To keep the UI working if tab content isn't built yet
                console.log(`Tab content for ${targetId} is not implemented yet.`);
                // Show a placeholder maybe? or just leave area blank.
                // Revert to detect as fallback for demonstration.
                document.getElementById('detect').classList.add('active');
            }
        });
    });

    // Animate radar sweep
    const radarChart = document.querySelector('.radar-chart');
    if (radarChart && !document.querySelector('.radar-sweep')) {
        const sweep = document.createElement('div');
        sweep.className = 'radar-sweep';
        sweep.style.position = 'absolute';
        sweep.style.bottom = '-50%';
        sweep.style.left = '50%';
        sweep.style.width = '350px';
        sweep.style.height = '350px';
        sweep.style.background = 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.2) 0deg, transparent 60deg)';
        sweep.style.borderRadius = '50%';
        sweep.style.transformOrigin = 'center center';
        sweep.style.animation = 'sweep 4s linear infinite';
        sweep.style.pointerEvents = 'none';
        radarChart.appendChild(sweep);

        // Add keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes sweep {
                0% { transform: translateX(-50%) rotate(0deg); }
                100% { transform: translateX(-50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});
