import { RecoilState, atom } from "recoil";

export const uploadTags: RecoilState<string[]> = atom({
  key: "uploadTags",
  default: Array<string>(),
});
