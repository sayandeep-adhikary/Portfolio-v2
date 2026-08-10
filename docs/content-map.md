# Content map — Sanity fields ↔ website

A quick reference for maintaining the portfolio. **Read each mapping as: edit the
Sanity field (left) → it changes the website element (right).** `*` = required.

> Editing rules that always apply:
>
> 1. **Publish, don't just save** — the site only reads published content.
> 2. **Singletons** (Hero, Current status, About, Skills, Experience, Certifications,
>    Achievements, Contact) are one document each; **collections** (Projects, Social
>    links) hold many.
> 3. **A published singleton fully replaces the fallback** — fill every field you care
>    about or that spot goes blank.
> 4. Keep exactly **one** project with `featured = true`, and always set image **alt** text.

## 1. Page overview — which section comes from which document

```mermaid
flowchart TB
  HP["🏠 Homepage /"]
  HP --> Hero["Hero ⇐ hero + currentStatus + socialLink"]
  HP --> Feat["Featured project ⇐ project (featured = true)"]
  HP --> Proj["Projects grid ⇐ project (featured = false)"]
  HP --> About["About ⇐ about"]
  HP --> Skills["Stack ⇐ skills"]
  HP --> Exp["Experience ⇐ experience"]
  HP --> Cert["Certifications ⇐ certifications"]
  HP --> Ach["Achievements ⇐ achievements"]
  HP --> Contact["Contact ⇐ contact + socialLink"]
  DP["📄 Case study /work/[slug] ⇐ project"]
  Foot["Footer ⇐ socialLink"]
```

## 2. Hero zone (hero + Current status + Social links)

```mermaid
flowchart LR
  subgraph SAN["🗂️ Sanity fields"]
    direction TB
    idx["hero.index"]
    eye["hero.eyebrow"]
    yr["hero.year"]
    role["hero.role"]
    loc["hero.location"]
    stmt["hero.statement *"]
    summ["hero.summary"]
    img["hero.image (+ alt)"]
    pcta["hero.primaryCta (label + href)"]
    scta["hero.secondaryCta (label + href)"]
    sstate["currentStatus.state *"]
    slabel["currentStatus.label *"]
    soc["socialLink.platform / label / url"]
  end
  idx --> META["meta line: 01 — eyebrow / year · role · location"]
  eye --> META
  yr --> META
  role --> META
  loc --> META
  stmt --> H1["large H1 headline (LCP)"]
  summ --> LEAD["intro paragraph"]
  img --> PORT["portrait image (placeholder if empty)"]
  pcta --> BTN1["primary button"]
  scta --> BTN2["secondary button"]
  sstate --> BADGE["availability badge — colour + dot"]
  slabel --> BADGE
  soc --> ICONS["social icons (hero + footer)"]
```

## 3. About + Skills

```mermaid
flowchart LR
  subgraph A["🗂️ about"]
    direction TB
    a_h["index / eyebrow / heading *"]
    a_intro["intro"]
    a_career["career"]
    a_focus["focus[] (label + detail)"]
    a_res["resume (label + file + meta)"]
  end
  a_h --> A_HDR["section header"]
  a_intro --> A_P1["intro paragraph"]
  a_career --> A_P2["career paragraph"]
  a_focus --> A_LEDGER["focus ledger rows"]
  a_res --> A_BTN["résumé button → uploaded PDF"]

  subgraph S["🗂️ skills"]
    direction TB
    s_h["index / eyebrow / heading *"]
    s_cat["categories[] (title + caption)"]
    s_sk["categories[].skills[] (name + primary)"]
  end
  s_h --> S_HDR["section header"]
  s_cat --> S_CARD["capability card (title + caption)"]
  s_sk --> S_TAG["skill tag — 'primary' = accent tint"]
```

## 4. Experience + Certifications + Achievements

```mermaid
flowchart LR
  subgraph E["🗂️ experience.entries[]"]
    direction TB
    e_pos["position * / company *"]
    e_meta["period / location / type"]
    e_sum["summary"]
    e_resp["responsibilities[]"]
    e_ach["achievements[]"]
    e_tech["technologies[]"]
  end
  e_pos --> E_TITLE["card title (Position · Company)"]
  e_meta --> E_META["card meta row"]
  e_sum --> E_SUM["expanded summary"]
  e_resp --> E_LIST1["responsibilities list (muted dots)"]
  e_ach --> E_LIST2["achievements list (accent dots)"]
  e_tech --> E_TAGS["tech tags"]

  subgraph C["🗂️ certifications.items[]"]
    direction TB
    c_t["title * / issuer"]
    c_meta["issued / category / credentialId"]
    c_url["credentialUrl"]
    c_badge["badge (image)"]
  end
  c_t --> C_HEAD["card heading + issuer"]
  c_meta --> C_ROWS["ISSUED / ID / category badge"]
  c_url --> C_VERIFY["'Verify' link (new tab)"]
  c_badge --> C_IMG["badge thumbnail"]

  subgraph AC["🗂️ achievements.items[]"]
    direction TB
    ac_t["title * / context"]
    ac_y["year"]
    ac_i["icon (award/trophy/star/spark)"]
    ac_u["url"]
  end
  ac_y --> AC_GROUP["year group heading"]
  ac_t --> AC_CARD["achievement card text"]
  ac_i --> AC_ICON["card icon"]
  ac_u --> AC_LINK["makes the card a link"]
```

## 5. Contact

```mermaid
flowchart LR
  subgraph CT["🗂️ contact"]
    direction TB
    ct_h["index / eyebrow / heading *"]
    ct_msg["message"]
    ct_mail["email *"]
    ct_loc["location"]
  end
  ct_h --> CT_HDR["section header"]
  ct_msg --> CT_INVITE["invitation text"]
  ct_mail --> CT_EMAIL["email row + copy button + form mailto"]
  ct_loc --> CT_LOC["location detail row"]
```

## 6. Projects (one schema → three places)

```mermaid
flowchart LR
  subgraph P["🗂️ project"]
    direction TB
    p_title["title *"]
    p_slug["slug * (→ /work/slug)"]
    p_feat["featured (toggle)"]
    p_order["orderRank"]
    p_desc["description"]
    p_cat["category"]
    p_meta["year / role / outcome"]
    p_tech["technologies[]"]
    p_img["image (+ alt)"]
    p_gal["gallery[]"]
    p_body["overview / architecture"]
    p_cl["challenges[] / lessons[]"]
    p_links["links (live / github)"]
  end
  p_feat --> WHERE{"featured?"}
  WHERE -->|true| FEAT["Featured block (home)"]
  WHERE -->|false| GRID["Projects grid (home)"]
  p_slug --> DETAIL["Case-study page /work/slug"]
  p_title --> FEAT & GRID & DETAIL
  p_desc --> FEAT & GRID
  p_cat --> FILTER["grid filter button + category badge"]
  p_order --> SORT["grid order + prev/next nav"]
  p_meta --> DETAIL
  p_tech --> TAGS["tech tags (card + detail)"]
  p_img --> IMGS["card thumbnail + detail hero"]
  p_gal --> DGAL["detail gallery"]
  p_body --> DBODY["case-study paragraphs"]
  p_cl --> DLISTS["challenges / lessons lists"]
  p_links --> DBTN["Live / GitHub buttons"]
```

---

**Source of truth:** schemas live in
[`src/sanity/schema/documents.ts`](../src/sanity/schema/documents.ts) and
[`objects.ts`](../src/sanity/schema/objects.ts); the GROQ that shapes them for the site is
in [`src/sanity/queries.ts`](../src/sanity/queries.ts).
