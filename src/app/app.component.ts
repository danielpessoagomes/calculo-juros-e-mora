import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Atualização de boletos');
  }

  dataVencimento: Date;
  dataPagamento: Date;
  diasDeAtraso: number;
  juros: number;
  multa: number;
  valor: number;
  valorAtualizado: number;

  calcular() {
    const multaEmPorcetagem = this.multa / 100;
    const jurosPorDia = (this.juros / 100) / 30;
    const totalDiasJuros = (jurosPorDia * this.diasDeAtraso);
    const totalAcrescimo = totalDiasJuros + multaEmPorcetagem;

    this.valorAtualizado = this.valor * (1 + totalAcrescimo);
  }

  calcularDias() {
    const pagamento = moment(this.dataPagamento);
    const vencimento = moment(this.dataVencimento);
    const dias = moment.duration(pagamento.diff(vencimento));

    this.diasDeAtraso = dias.asDays();
  }

  get btnCalcularDias() {
    return Boolean(this.dataPagamento <= this.dataVencimento);
  }

  get inputDiasAtraso() {
    return Boolean(this.diasDeAtraso <= 0 && this.diasDeAtraso === null);
  }
}
