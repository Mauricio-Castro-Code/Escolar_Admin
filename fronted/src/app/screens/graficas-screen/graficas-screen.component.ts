import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {

  public total_user: any = {};

  public labels_graficas = ["Administradores", "Maestros", "Alumnos"];

  // Light & Fresh Palette (System Compatible)
  // Admin: #00b5e2 (Cyan - Primary Accent)
  // Maestros: #60a5fa (Soft Blue)
  // Alumnos: #818cf8 (Soft Indigo)

  // 1. Lineal (Line Chart)
  lineChartData: any = {
    labels: this.labels_graficas,
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de Usuarios',
        backgroundColor: 'rgba(0, 181, 226, 0.15)', // Very light Cyan fill
        borderColor: '#00b5e2',     // Cyan Line
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00b5e2',
        pointHoverBackgroundColor: '#00b5e2',
        pointHoverBorderColor: '#fff',
        fill: true,
        tension: 0.4
      }
    ]
  };
  lineChartOption: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.04)' }
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { labels: { color: '#444' } }
    }
  };
  lineChartPlugins = [DatalabelsPlugin];

  // 2. Barras (Bar Chart)
  barChartData: any = {
    labels: this.labels_graficas,
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Usuarios Registrados',
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        borderRadius: 8,
        barPercentage: 0.6
      }
    ]
  };
  barChartOption: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.04)' }
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false } // Hide legend for cleaner look if single dataset
    }
  };
  barChartPlugins = [DatalabelsPlugin];

  // 3. Circular (Pie Chart)
  pieChartData: any = {
    labels: this.labels_graficas,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        hoverBackgroundColor: ['#009cc2', '#5094e6', '#707be3'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };
  pieChartOption: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, color: '#444' } }
    }
  };
  pieChartPlugins = [DatalabelsPlugin];

  // 4. Dona (Doughnut Chart)
  doughnutChartData: any = {
    labels: this.labels_graficas,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        hoverBackgroundColor: ['#009cc2', '#5094e6', '#707be3'],
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };
  doughnutChartOption: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'right', labels: { usePointStyle: true, color: '#444' } }
    }
  };
  doughnutChartPlugins = [DatalabelsPlugin];

  constructor(
    private administradoresServices: AdministradoresService
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  public obtenerTotalUsers() {
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response) => {
        this.total_user = response;
        console.log("Total usuarios: ", this.total_user);


        const listaDatos = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos
        ];

        // Actualizar gráficas
        this.actualizarGraficas(listaDatos);

      }, (error) => {
        console.log("Error al obtener total de usuarios ", error);
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }

  public actualizarGraficas(data: any[]) {

    // Lineal
    this.lineChartData = {
      labels: this.labels_graficas,
      datasets: [{
        data: data,
        label: 'Registro de Usuarios',
        backgroundColor: 'rgba(0, 181, 226, 0.15)',
        borderColor: '#00b5e2',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00b5e2',
        fill: true,
        tension: 0.4
      }]
    };

    // Barras
    this.barChartData = {
      labels: this.labels_graficas,
      datasets: [{
        data: data,
        label: 'Usuarios',
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        borderRadius: 8
      }] // Fixed closing syntax
    };

    // Pastel
    this.pieChartData = {
      labels: this.labels_graficas,
      datasets: [{
        data: data,
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };

    // Dona
    this.doughnutChartData = {
      labels: this.labels_graficas,
      datasets: [{
        data: data,
        backgroundColor: ['#00b5e2', '#60a5fa', '#818cf8'],
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };
  }
}
