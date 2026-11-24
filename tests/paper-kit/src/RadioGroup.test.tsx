import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox, RadioGroup, type RadioOption } from "../../../packages/paper-kit/src";

type User = ReturnType<typeof userEvent.setup>;

/**
 * An arrow key held for a moment, as a person does. Radix moves focus a tick after the keydown and
 * chooses the radio only while the key is still down, so a keydown and keyup in one go would not choose.
 */
async function arrow(user: User, key: "ArrowDown" | "ArrowUp" | "ArrowLeft" | "ArrowRight") {
  await user.keyboard(`{${key}>}`);
  await new Promise((resolve) => setTimeout(resolve, 0));
  await user.keyboard(`{/${key}}`);
}

const TRAY: RadioOption[] = [
  { value: "automatic", label: "Automatic" },
  { value: "off", label: "Off" },
];

const THREE: RadioOption[] = [
  { value: "stable", label: "Stable" },
  { value: "beta", label: "Beta", disabled: true },
  { value: "nightly", label: "Nightly" },
];

function Tray(props: Partial<React.ComponentProps<typeof RadioGroup>> = {}) {
  return <RadioGroup label="Keep in the tray" options={TRAY} defaultValue="automatic" {...props} />;
}

describe("RadioGroup semantics", () => {
  it("is a radiogroup named by its label, with a radio per option named by its label", () => {
    render(<Tray />);
    const group = screen.getByRole("radiogroup", { name: "Keep in the tray" });
    const radios = within(group).getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("aria-checked"))).toEqual(["true", "false"]);
    expect(screen.getByRole("radio", { name: "Automatic" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Off" })).toBeTruthy();
  });

  it("describes the group by its hint and an option by its own hint", () => {
    render(
      <RadioGroup
        label="Update channel"
        hint="Takes effect on the next start."
        options={[{ value: "stable", label: "Stable", hint: "Tested builds only." }, { value: "beta", label: "Beta" }]}
      />,
    );
    expect(screen.getByRole("radiogroup").getAttribute("aria-describedby")).toBe(
      document.getElementById(screen.getByText("Takes effect on the next start.").id)?.id,
    );
    const stable = screen.getByRole("radio", { name: "Stable" });
    expect(document.getElementById(stable.getAttribute("aria-describedby") ?? "")?.textContent).toBe("Tested builds only.");
    expect(screen.getByRole("radio", { name: "Beta" }).getAttribute("aria-describedby")).toBeNull();
  });

  it("marks the group invalid and shows the error as its description", () => {
    render(<Tray error="Pick one." />);
    const group = screen.getByRole("radiogroup");
    expect(group.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(group.getAttribute("aria-describedby") ?? "")?.textContent).toBe("Pick one.");
  });
});

describe("RadioGroup keyboard", () => {
  it("is one tab stop: Tab lands on the chosen radio and the next Tab leaves the group", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">before</button>
        <Tray defaultValue="off" />
        <button type="button">after</button>
      </>,
    );
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "before" }));
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Off" }));
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "after" }));
  });

  it("moves and chooses with the arrow keys, wrapping at the ends", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tray onValueChange={onValueChange} />);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Automatic" }));

    await arrow(user, "ArrowDown");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Off" }));
    expect(screen.getByRole("radio", { name: "Off" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Automatic" }).getAttribute("aria-checked")).toBe("false");
    expect(onValueChange).toHaveBeenLastCalledWith("off");

    await arrow(user, "ArrowDown");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Automatic" }));
    expect(onValueChange).toHaveBeenLastCalledWith("automatic");

    await arrow(user, "ArrowUp");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Off" }));
    expect(onValueChange).toHaveBeenLastCalledWith("off");

    await arrow(user, "ArrowRight");
    expect(screen.getByRole("radio", { name: "Automatic" }).getAttribute("aria-checked")).toBe("true");
    await arrow(user, "ArrowLeft");
    expect(screen.getByRole("radio", { name: "Off" }).getAttribute("aria-checked")).toBe("true");
  });

  it("laid out in a row, follows the row's arrows and leaves the vertical ones alone", async () => {
    const user = userEvent.setup();
    render(<Tray orientation="horizontal" />);
    expect(screen.getByRole("radiogroup").className).toContain("flex");
    await user.tab();
    await arrow(user, "ArrowDown");
    expect(screen.getByRole("radio", { name: "Automatic" }).getAttribute("aria-checked")).toBe("true");
    await arrow(user, "ArrowRight");
    expect(screen.getByRole("radio", { name: "Off" }).getAttribute("aria-checked")).toBe("true");
  });

  it("skips a disabled option", async () => {
    const user = userEvent.setup();
    render(<RadioGroup label="Update channel" options={THREE} defaultValue="stable" />);
    await user.tab();
    await arrow(user, "ArrowDown");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Nightly" }));
    expect(screen.getByRole("radio", { name: "Nightly" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Beta" }).getAttribute("aria-checked")).toBe("false");
  });

  it("chooses with a click on the mark or on its label, and says so once", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tray onValueChange={onValueChange} />);
    await user.click(screen.getByText("Off"));
    expect(screen.getByRole("radio", { name: "Off" }).getAttribute("aria-checked")).toBe("true");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("radio", { name: "Automatic" }));
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange).toHaveBeenLastCalledWith("automatic");
  });
});

describe("RadioGroup disabled", () => {
  it("a disabled group cannot be tabbed into, clicked or moved", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tray disabled onValueChange={onValueChange} />);
    for (const radio of screen.getAllByRole("radio")) expect((radio as HTMLButtonElement).disabled).toBe(true);
    await user.tab();
    expect(document.activeElement).toBe(document.body);
    await user.click(screen.getByText("Off"));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "Automatic" }).getAttribute("aria-checked")).toBe("true");
  });

  it("a disabled option cannot be clicked, and its mark is dimmed like the other controls'", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioGroup label="Update channel" options={THREE} defaultValue="stable" onValueChange={onValueChange} />);
    const beta = screen.getByRole("radio", { name: "Beta" });
    expect((beta as HTMLButtonElement).disabled).toBe(true);
    expect(beta.className).toContain("disabled:opacity-45");
    await user.click(screen.getByText("Beta"));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("RadioGroup in a form and as controlled", () => {
  it("puts the chosen value in the form under its name", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="form">
        <Tray name="tray" />
      </form>,
    );
    const read = () => new FormData(screen.getByTestId("form") as HTMLFormElement).get("tray");
    expect(read()).toBe("automatic");
    await user.click(screen.getByText("Off"));
    expect(read()).toBe("off");
  });

  it("follows `value` when the app controls it", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = React.useState("stable");
      return (
        <>
          <RadioGroup label="Update channel" options={THREE} value={value} onValueChange={setValue} />
          <output data-testid="value">{value}</output>
        </>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByText("Nightly"));
    expect(screen.getByTestId("value").textContent).toBe("nightly");
    expect(screen.getByRole("radio", { name: "Nightly" }).getAttribute("aria-checked")).toBe("true");
  });

  it("lands data-testid and className on the group", () => {
    render(<Tray data-testid="tray-choice" className="extra" />);
    const group = screen.getByTestId("tray-choice");
    expect(group.getAttribute("role")).toBe("radiogroup");
    expect(group.className).toContain("extra");
  });
});

describe("RadioGroup look, as the other controls", () => {
  it("draws a round mark with the same border, background and dim as Checkbox, and no focus ring of its own", () => {
    render(
      <>
        <Tray />
        <Checkbox label="Checkbox" />
      </>,
    );
    const radio = screen.getByRole("radio", { name: "Automatic" });
    const checkbox = screen.getByRole("checkbox");
    expect(radio.className).toContain("rounded-full");
    expect(checkbox.className).not.toContain("rounded");
    for (const c of ["size-4", "border-input", "bg-background", "disabled:opacity-45", "data-[state=checked]:border-primary"]) {
      expect(radio.className).toContain(c);
      expect(checkbox.className).toContain(c);
    }
    expect(radio.className).not.toMatch(/focus(-visible)?:/);
    expect(checkbox.className).not.toMatch(/focus(-visible)?:/);
  });

  it("shows the chosen option with an inner dot only", () => {
    render(<Tray defaultValue="off" />);
    expect(screen.getByRole("radio", { name: "Off" }).querySelector("span")).not.toBeNull();
    expect(screen.getByRole("radio", { name: "Automatic" }).querySelector("span")).toBeNull();
  });

  it("an error turns each mark's border to the error colour", () => {
    render(<Tray error="Pick one." />);
    for (const radio of screen.getAllByRole("radio")) expect(radio.className).toContain("border-err");
  });
});
