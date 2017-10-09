import {default as tinycolor} from 'tinycolor2';

import {Field} from './Field';

export class GradientField extends Field {
  createUi(container) {
    var fieldContainer = $('.form-field-container-row', super.createUi(container, 'form-field-container-row'));

    this.from_el_ = $('<input>')
      .attr('type', 'text')
      .attr('id', this.getHtmlId()+"-from")
      .appendTo(fieldContainer);

    this.to_el_ = $('<input>')
      .attr('type', 'text')
      .attr('id', this.getHtmlId()+"-to")
      .appendTo(fieldContainer);

    let from_update_ = color => this.setFromValue(color, true);
    let to_update_ = color => this.setToValue(color, true);

    let palette = [
      ['#ffffff', '#000000'],
      ['#f44336', '#e91e63'],
      ['#9c27b0', '#673ab7'],
      ['#3f51b5', '#2196f3'],
      ['#03a9f4', '#00bcd4'],
      ['#009688', '#4caf50'],
      ['#8bc34a', '#cddc39'],
      ['#ffeb3b', '#ffc107'],
      ['#ff9800', '#ff5722'],
      ['#9e9e9e', '#607d8b']
    ];

    this.from_el_.spectrum({
      color: this.getValue().from.toRgbString(),
      showInput: true,
      showPalette: true,
      showAlpha: this.params_.alpha,
      preferredFormat: 'hex',
      palette: palette,
      localStorageKey: 'recentcolors',
      showInitial: true,
      showButtons: false,
      change: from_update_,
      move: from_update_
    });

    this.to_el_.spectrum({
      color: this.getValue().to.toRgbString(),
      showInput: true,
      showPalette: true,
      showAlpha: this.params_.alpha,
      preferredFormat: 'hex',
      palette: palette,
      localStorageKey: 'recentcolors',
      showInitial: true,
      showButtons: false,
      change: to_update_,
      move: to_update_
    });
  }

  getValue() {
    return {
      'from': this.from_value_ || tinycolor(this.params_.defaultFrom || '#000'),
      'to':  this.to_value_ || tinycolor(this.params_.defaultTo || '#000')
    };
  }

  setFromValue(val, pauseUi) {
    let oldValue = this.from_value_;
    this.from_value_ = (val.hasOwnProperty('_r'))
      ? val
      : tinycolor(val || this.params_.defaultFrom || '#000');
    if (!pauseUi) {
      this.from_el_.spectrum('set', this.from_value_.toRgbString());
    }
    this.notifyChanged_(val, oldValue);
  }

  setToValue(val, pauseUi) {
    let oldValue = this.to_value_;
    this.to_value_ = (val.hasOwnProperty('_r'))
      ? val
      : tinycolor(val || this.params_.defaultTo || '#000');
    if (!pauseUi) {
      this.to_el_.spectrum('set', this.to_value_.toRgbString());
    }
    this.notifyChanged_(val, oldValue);
  }

  serializeValue() {
    return this.getValue().from.toRgbString()+" "+this.getValue().to.toRgbString()
  }

  deserializeValue(s) {
    let split = s.split();
    if (split[0] !== undefined) {
      this.setFromValue(split[0]);
    }
    if (split[1] !== undefined) {
      this.setToValue(split[1]);
    }
  }
}
