document.addEventListener('DOMContentLoaded', () => {
    fetch('hw2-papers.csv')
        .then(response => response.text())
        .then(data => {
            const readingsSection = document.querySelector('#readings');
            const readingsList = readingsSection.querySelector('ul');
            const topicsDropdown = readingsSection.querySelector('#topics');

            const topicsSet = new Set();

            // Add a default "All" option
            const allOption = document.createElement('option');
            allOption.value = 'All';
            allOption.textContent = 'All';
            topicsDropdown.appendChild(allOption);

            const rows = data.split('\n');
            for(let i = 1; i < rows.length; i++) {
                if(rows[i].trim() === '') continue;
                const cols = rows[i].split(';');

                topicsSet.add(cols[3].trim());

                const li = document.createElement('li');
                const span = document.createElement('span');
                span.className = 'name';

                const a = document.createElement('a');
                a.href = cols[4];
                a.textContent = cols[2];
                a.setAttribute('data-topic', cols[3].trim());
                span.appendChild(a);
                li.appendChild(span);
                readingsList.appendChild(li);
            }

            // Populate the dropdown with unique topics
            topicsSet.forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                topicsDropdown.appendChild(option);
            });

            // Add event listener to the dropdown to filter the list
            topicsDropdown.addEventListener('change', () => {
                const selectedTopic = topicsDropdown.value;
                filterReadingsByTopic(selectedTopic);
            });
        });
});

function filterReadingsByTopic(topic) {
    const readings = document.querySelectorAll('#readings ul li');
    readings.forEach(reading => {
        const span = reading.querySelector('.name');
        const a = span.querySelector('a');
        const readingTopic = a.getAttribute('data-topic');

        if (topic === 'All' || readingTopic === topic) {
            reading.style.display = 'block';
        } else {
            reading.style.display = 'none';
        }
    });
}