import { Strategies } from "./Strategies";

jest.mock("./utils", () => ({
  ...jest.requireActual("./utils"),
  color: jest.fn(() => "color"),
  shuffle: <T>(xs: T[]) => xs,
}));

describe("Strategies", () => {
  describe("#of", () => {
    it("renders a field of color", () => {
      const { caption, html } = Strategies.of();

      expect(caption).toEqual("a field of color");

      expect(html).toEqual(
        '<div class="Of" style="background-color: color"></div>'
      );
    });

    it("accepts and returns children", () => {
      const { caption, html } = Strategies.of([Strategies.beside()]);

      expect(caption).toEqual("a field of color beside a field of color");

      expect(html).toEqual(
        '<div class="Beside"><div class="Beside--a" style="background-color: color"></div><div class="Beside--b" style="background-color: color"></div></div>'
      );
    });
  });

  describe("#within", () => {
    it("renders a field of color within another field of color", () => {
      const { caption, html } = Strategies.within();

      expect(caption).toEqual("a field of color within a field of color");

      expect(html).toEqual(
        '<div class="Within"><div class="Within--a" style="background-color: color"><div class="Within--b" style="background-color: color"></div></div></div>'
      );
    });

    it("accepts and renders children", () => {
      const { caption, html } = Strategies.within([Strategies.beside()]);

      expect(caption).toEqual(
        "a field of color beside a field of color within a field of color"
      );

      expect(html).toEqual(
        '<div class="Within"><div class="Within--a" style="background-color: color"><div class="Within--b" style="background-color: color"><div class="Beside"><div class="Beside--a" style="background-color: color"></div><div class="Beside--b" style="background-color: color"></div></div></div></div></div>'
      );
    });
  });

  describe("#beside", () => {
    it("renders a field of color beside another field of color", () => {
      const { caption, html } = Strategies.beside();

      expect(caption).toEqual("a field of color beside a field of color");

      expect(html).toEqual(
        '<div class="Beside"><div class="Beside--a" style="background-color: color"></div><div class="Beside--b" style="background-color: color"></div></div>'
      );
    });

    it("accepts and renders children", () => {
      const { caption, html } = Strategies.beside([
        Strategies.within(),
        Strategies.within(),
      ]);

      expect(caption).toEqual(
        "a field of color within a field of color beside a field of color within a field of color"
      );

      expect(html).toEqual(
        '<div class="Beside"><div class="Beside--a" style="background-color: color"><div class="Within"><div class="Within--a" style="background-color: color"><div class="Within--b" style="background-color: color"></div></div></div></div><div class="Beside--b" style="background-color: color"><div class="Within"><div class="Within--a" style="background-color: color"><div class="Within--b" style="background-color: color"></div></div></div></div></div>'
      );
    });

    // TODO:
    it.skip("generates a caption in the correct order", () => {
      const { caption } = Strategies.beside([
        Strategies.beside(),
        Strategies.beside(),
      ]);

      expect(caption).toEqual(
        "a field of yellow beside a field of blue beside a field of turquoise beside a field of black"
      );
    });
  });
});
