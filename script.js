document.addEventListener("DOMContentLoaded", function () {
    setInterval(fetchRealtimeData, 5000); // Update data setiap 5 detik
    populateMonthYearDropdown(); // Mengisi dropdown bulan & tahun
});

// ✅ Fungsi Fetch Data Real-Time
function fetchRealtimeData() {
    fetch("get_realtime_data.php")
        .then(response => response.json())
        .then(data => {
            console.log("Data real-time:", data); // Debugging

            document.getElementById("suhu").textContent = data.suhu;
            document.getElementById("ph").textContent = data.ph;
            document.getElementById("tds").textContent = data.tds;

            updateBoxColor(".suhu", data.suhu, 32, 28);
            updateBoxColor(".ph", data.ph, 8, 6.5);
            updateBoxColor(".tds", data.tds, 500, 200);
        })
        .catch(error => console.error("Error fetching real-time data:", error));
}

// ✅ Fungsi Mengubah Warna Box Sensor
function updateBoxColor(selector, value, high, low) {
    let box = document.querySelector(selector);
    if (value > high) {
        box.style.backgroundColor = "red";
    } else if (value < low) {
        box.style.backgroundColor = "blue";
    } else {
        box.style.backgroundColor = "green";
    }
}

// ✅ Fungsi Mengisi Dropdown Bulan & Tahun
function populateMonthYearDropdown() {
    let bulanDropdown = document.getElementById("bulan");
    let tahunDropdown = document.getElementById("tahun");

    // 🟢 Nama bulan dalam bahasa Indonesia
    const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // ✅ Mengisi dropdown bulan
    namaBulan.forEach((bulan, index) => {
        let option = document.createElement("option");
        option.value = index + 1; // 1 = Januari, 2 = Februari, dst.
        option.textContent = bulan;
        bulanDropdown.appendChild(option);
    });

    // ✅ Mengisi dropdown tahun (5 tahun terakhir hingga sekarang)
    let tahunSekarang = new Date().getFullYear();
    for (let i = tahunSekarang; i >= tahunSekarang - 5; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        tahunDropdown.appendChild(option);
    }
}

// ✅ Fungsi Menampilkan Laporan Berdasarkan Pilihan
function loadReport() {
    let bulan = document.getElementById("bulan").value;
    let tahun = document.getElementById("tahun").value;

    console.log(`Menampilkan laporan bulan ${bulan} tahun ${tahun}`);

    fetch(`get_report_data.php?bulan=${bulan}&tahun=${tahun}`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.querySelector("#reportTable tbody");
            tableBody.innerHTML = ""; // Kosongkan tabel sebelum diisi ulang

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
        .catch(error => console.error("Error fetching report data:", error));
}
