import {
  FacebookSource,
  GithubSource,
  GoogleSource,
  GravatarSource,
  IconSource,
  InstagramSource,
  RedirectSource,
  SkypeSource,
  SrcSource,
  TwitterSource,
  VKontakteSource,
  ValueSource,
  createAvatarComponent,
} from "react-avatar"

import React from "react"

interface indexProps {}

const Avatar = createAvatarComponent({
  sources: [
    FacebookSource,
    GithubSource,
    GoogleSource,
    GravatarSource,
    IconSource,
    InstagramSource,
    RedirectSource,
    SkypeSource,
    SrcSource,
    TwitterSource,
    VKontakteSource,
    ValueSource,
  ],
})

export const Gravatar: React.FC<indexProps> = () => {
  return (
    <Avatar
      // githubHandle="suryabranwal"
      email="pak11273@yahoo.com"
      // twitterHandle="pak11273"
      // instagramId="pak11273"
      // googleId="pak11273"
      // skypeId="pak11273"
      round={true}
      name="Bill Morris"
      color={Avatar.getRandomColor("willis", [
        "tomato",
        "darkcyan",
        "mediumseagreen",
      ])}
      size="24"
      onClick={() => alert("gravatar!!")}
    />
  )
}
