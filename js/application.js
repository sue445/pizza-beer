var app = {};

app.vm = {
  init: function() {
    app.vm.people = m.prop(10);
    app.vm.price_per_pizza = m.prop(3800);
    app.vm.price_per_beer = m.prop(186);
    app.vm.beer_per_person = m.prop(1.5);

    app.vm.pizza_count = function () {
      // NOTE: 大人3人でピザLサイズ1枚。端数は四捨五入
      return Math.round(app.vm.people() / 3);
    };

    app.vm.pizza_price = function () {
      return app.vm.price_per_pizza() * app.vm.pizza_count();
    };

    app.vm.beer_price = function () {
      return Math.ceil(app.vm.price_per_beer() * app.vm.people() * app.vm.beer_per_person());
    };

    app.vm.total_price = function () {
      return app.vm.pizza_price() + app.vm.beer_price();
    };

    app.vm.price_per_person = function () {
      return Math.ceil(app.vm.total_price() / app.vm.people());
    };
  }
};

app.controller = function() {
  app.vm.init();
};

app.view = function() {
  return m("div", { class: "row" }, [
    m("div", { class: "col-md-6"}, [
      m("h2", "入力フォーム"),
      m("form", [
        m("div", { class: "form-group" }, [
          m("label", { for: "people" }, "人数"),
          m("input", {
            id: "people", type: "number", class: "form-control", placeholder: "人", min: 0,
            onchange: m.withAttr("value", app.vm.people), value: app.vm.people()
          })
        ]),
        m("div", { class: "form-group" }, [
          m("label", { for: "price_per_pizza" }, "ピザ（Lサイズ） 1枚辺りの税抜金額"),
          m("input", {
            id: "price_per_pizza", type: "number", class: "form-control", placeholder: "円", min: 0,
            onchange: m.withAttr("value", app.vm.price_per_pizza), value: app.vm.price_per_pizza()
          })
        ]),
        m("div", { class: "form-group" }, [
          m("label", { for: "price_per_beer" }, "ビール 1本辺りの税抜金額"),
          m("input", {
            id: "price_per_beer", type: "number", class: "form-control", placeholder: "円", min: 0,
            onchange: m.withAttr("value", app.vm.price_per_beer), value: app.vm.price_per_beer()
          })
        ]),
        m("div", { class: "form-group" }, [
          m("label", { for: "beer_per_person" }, "1人辺りのビール消費本数"),
          m("input", {
            id: "beer_per_person", type: "number", class: "form-control", placeholder: "本", min: 0, step: "0.5",
            onchange: m.withAttr("value", app.vm.beer_per_person), value: app.vm.beer_per_person()
          })
        ])
      ])
    ]),
    m("div", { class: "col-md-6" }, [
      m("h2", "計算結果（発注量）"),
      m("table", { class: "table table-condensed table-hover" }, [
        m("tbody", [
          m("tr", [
            m("th", "人数"),
            m("td", [
              m("span", { class: "number" }, app.vm.people() + "人")
            ])
          ]),
          m("tr", [
            m("th", "ピザ（Lサイズ）"),
            m("td", [
              m("span", { class: "number" }, app.vm.price_per_pizza() + "円 x " + app.vm.pizza_count() + "枚 = " + app.vm.pizza_price() + "円")
            ])
          ]),
          m("tr", [
            m("th", "ビール"),
            m("td", [
              m("span", { class: "number" }, app.vm.price_per_beer() + "円 x " + app.vm.people() + "人 x " + app.vm.beer_per_person() + "(本/人) ≒ " + app.vm.beer_price() + "円")
            ])
          ]),
          m("tr", [
            m("th", "合計金額"),
            m("td", [
              m("span", { class: "number" }, app.vm.total_price() + "円")
            ])
          ]),
          m("tr", [
            m("th", "1人辺りの金額"),
            m("td", [
              m("span", { class: "number" }, app.vm.price_per_person() + "円")
            ])
          ])
        ])
      ])
    ])
  ]);
};

m.mount(document.getElementById("main"), { controller: app.controller, view: app.view });
