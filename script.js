document.addEventListener("DOMContentLoaded", function () {
    populateDateFilters(); // Isi pilihan tanggal, bulan, dan tahun
    loadReport(); // Tampilkan report awal
    setInterval(fetchRealtimeData, 5000); // Update data setiap 5 detik
});


function fetchRealtimeData() {
    fetch("get_realtime_data.php")
        .then(response => response.json())
        .then(data => {
            // Pastikan elemen HTML tersedia sebelum mengupdate datanya
            if (document.getElementById("suhu") && document.getElementById("ph") && document.getElementById("tds")) {
                document.getElementById("suhu").textContent = data.suhu || "--";
                document.getElementById("ph").textContent = data.ph || "--";
                document.getElementById("tds").textContent = data.tds || "--";

                // Ubah warna berdasarkan nilai
                updateBoxColor(".suhu", data.suhu, 32, 28); // Jika suhu >32°C merah, <28°C biru
                updateBoxColor(".ph", data.ph, 8, 6.5); // Jika pH >8 hijau tua, <6.5 kuning
                updateBoxColor(".tds", data.tds, 500, 200); // Jika TDS >500ppm biru tua, <200ppm abu-abu
            } else {
                console.error("Elemen data real-time tidak ditemukan di HTML.");
            }
        })
        .catch(error => console.error("Error fetching real-time data:", error));
}

// Fungsi untuk mengubah warna sensor box berdasarkan data
function updateBoxColor(selector, value, high, low) {
    let box = document.querySelector(selector);
    if (box) {
        if (value > high) {
            box.style.backgroundColor = "red";
        } else if (value < low) {
            box.style.backgroundColor = "blue";
        } else {
            box.style.backgroundColor = "green";
        }
    }
}


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
