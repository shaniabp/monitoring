document.addEventListener("DOMContentLoaded", function () {
    populateDateFilters(); // Isi pilihan tanggal, bulan, dan tahun
    loadReport(); // Tampilkan report awal
    setInterval(fetchRealtimeData, 5000); // Update data setiap 5 detik
});

// Fungsi untuk mengisi dropdown tanggal, bulan, dan tahun
function populateDateFilters() {
    let tanggalSelect = document.getElementById("tanggal");
    let bulanSelect = document.getElementById("bulan");
    let tahunSelect = document.getElementById("tahun");

    // Isi tanggal 1-31
    for (let i = 1; i <= 31; i++) {
        let option = new Option(i, i);
        tanggalSelect.add(option);
    }

    // Isi bulan 1-12
    let bulanArray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    for (let i = 0; i < 12; i++) {
        let option = new Option(bulanArray[i], i + 1);
        bulanSelect.add(option);
    }

    // Isi tahun dari 2020 hingga tahun sekarang
    let tahunSekarang = new Date().getFullYear();
    for (let i = tahunSekarang; i >= 2020; i--) {
        let option = new Option(i, i);
        tahunSelect.add(option);
    }
}

// Fungsi untuk mengambil data berdasarkan tanggal, bulan, dan tahun yang dipilih
function loadReport() {
    let tanggal = document.getElementById("tanggal").value;
    let bulan = document.getElementById("bulan").value;
    let tahun = document.getElementById("tahun").value;

    fetch(`get_report_data.php?tanggal=${tanggal}&bulan=${bulan}&tahun=${tahun}`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.querySelector("#reportTable tbody");
            tableBody.innerHTML = ""; // Hapus data lama

            data.forEach((row, index) => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row.waktu}</td>
                    <td>${row.suhu} °C</td>
                    <td>${row.ph}</td>
                    <td>${row.tds} ppm</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error loading report data:", error));
}
