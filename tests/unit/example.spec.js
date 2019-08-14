import { expect } from "chai";
// import { shallowMount } from "@vue/test-utils";
import ContactForm from "@/components/ContactForm.vue";

describe("Contact form component", () => {
  it("check default data", () => {
    expect(typeof ContactForm.data).toBe("function");
    const defaultData = ContactForm.data();
    expect(defaultData.firstName).toBe("");
    expect(defaultData.lastName).toBe("");
    expect(defaultData.phone).toBe("");
    expect(defaultData.phoneSecondary).toBe("");
    expect(defaultData.mail).toBe("");
    expect(defaultData.errors).toBe([]);
    expect(defaultData.isSuccess).toBe(false);
  });
});
