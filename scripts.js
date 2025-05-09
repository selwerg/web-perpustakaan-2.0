let bukuList = JSON.parse(localStorage.getItem("bukuList")) || [];

function simpanLocal() {
  localStorage.setItem("bukuList", JSON.stringify(bukuList));
}

function tampilkanBuku() {
  const tbody = document.getElementById("daftarBuku");
  tbody.innerHTML = "";

  bukuList.forEach((buku, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${buku.judul}</td>
        <td>${buku.penulis}</td>
        <td>${buku.tahun}</td>
        <td>
          <button onclick="editBuku(${index})">Edit</button>
          <button onclick="hapusBuku(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById("formBuku").addEventListener("submit", function (e) {
  e.preventDefault();

  const judul = document.getElementById("judul").value;
  const penulis = document.getElementById("penulis").value;
  const tahun = document.getElementById("tahun").value;
  const indexEdit = document.getElementById("indexEdit").value;

  const buku = { judul, penulis, tahun };

  if (indexEdit === "") {
    bukuList.push(buku);
  } else {
    bukuList[indexEdit] = buku;
    document.getElementById("indexEdit").value = "";
  }

  simpanLocal();
  tampilkanBuku();
  this.reset();
});

function editBuku(index) {
  const buku = bukuList[index];
  document.getElementById("judul").value = buku.judul;
  document.getElementById("penulis").value = buku.penulis;
  document.getElementById("tahun").value = buku.tahun;
  document.getElementById("indexEdit").value = index;
}

function hapusBuku(index) {
  if (confirm("Yakin ingin menghapus buku ini?")) {
    bukuList.splice(index, 1);
    simpanLocal();
    tampilkanBuku();
  }
}

window.onload = tampilkanBuku;
