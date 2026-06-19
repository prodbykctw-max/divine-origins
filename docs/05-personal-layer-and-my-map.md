# Personal Layer — "My Map," Forking, and Sharing

**Purpose:** The original spec (`docs/01`) promises users they can save their own connections as a personal layer ("my map"). This document defines how that personal layer works — how it's stored, how it relates to the canonical map, and how users can share or fork their maps.

---

## Design principle

The canonical Source Map (curated by the project) is the **base layer**. Every user gets their own **overlay** that lives on top of it. Overlays can:

- Add new connection lines between existing nodes
- Add notes to existing nodes
- Highlight subsets of nodes the user finds important
- Add new nodes (proposed; flagged as user-contributed)
- Hide nodes the user wants out of view
- Be exported, shared, and forked

Crucially: the user's overlay never alters the base layer. The base map is a stable reference shared by everyone. The overlay is the user's interpretation written on top of it.

---

## Three views of the same map

The UI surfaces three view modes (per `docs/01` section 4) and the personal layer interacts with each:

| View mode | What it shows | Personal layer behavior |
|---|---|---|
| **Canonical** | Base map only, project-curated | Overlay is hidden; user sees the same map as everyone else |
| **My Map** | Base map + user's overlay | All user-drawn connections, notes, highlights, hidden nodes applied |
| **Scholarly** | Base map + scholarly caveats | Independent of personal layer; can be combined with My Map |

The "My Map" toggle is the entry point to the personal layer. Default behavior on first session: a clean overlay with no edits.

---

## What a user can add to their overlay

### 1. Custom connection lines

The signature interaction. The user drags from one node to another and records *why* they see a parallel. Each user-drawn line has its own schema (see `docs/06` for the connection-evidence detail):

```json
{
  "id": "user-conn-9f3a",
  "from_node": "enki",
  "to_node": "prometheus",
  "user_id": "user_xyz",
  "evidence_types": ["structural-function-match", "narrative-pattern-match"],
  "note": "Both fashioned humanity and defied the senior council to give us fire/wisdom.",
  "created_at": "2026-05-15T19:00:00Z",
  "visibility": "private"
}
```

### 2. Node annotations

Personal notes attached to existing nodes. Markdown-supported. Visible only to the user unless explicitly shared.

```json
{
  "id": "user-note-1c2d",
  "node_id": "sophia",
  "user_id": "user_xyz",
  "body": "Reading Sophia as the same figure as the Holy Spirit in feminine readings cracked something open. Returning to this.",
  "created_at": "2026-05-15T19:05:00Z",
  "visibility": "private"
}
```

### 3. Highlights and tags

Custom colored highlights or tags applied to nodes, so a user can color-code their own thematic groupings.

```json
{
  "id": "user-tag-set-3",
  "user_id": "user_xyz",
  "tag_name": "Light-bringers I want to study",
  "color": "#ffb547",
  "node_ids": ["sophia", "prometheus", "enki", "thoth", "christ-aeon", "khidr"]
}
```

### 4. Hidden nodes

The user can hide nodes from their personal view without affecting the base map.

```json
{
  "user_id": "user_xyz",
  "hidden_node_ids": ["modern-syncretic-channeled-source-X"]
}
```

### 5. User-proposed nodes

A user can add a figure they think should be in the database. These are flagged as user-contributed and only appear in that user's overlay until reviewed for inclusion in the canonical map.

```json
{
  "id": "user-node-tiamat",
  "primary_name": "Tiamat",
  "tradition": "Mesopotamian (older Sumero-Akkadian layer)",
  "tier": "cross-tier",
  "user_id": "user_xyz",
  "status": "user-contributed-pending-review",
  "essence": "Primordial saltwater chaos-mother slain by Marduk to fashion the cosmos from her corpse. Read as the suppressed feminine ground in some feminist Gnostic readings.",
  "function_tags": ["primordial-feminine", "slain-by-demiurge", "matter-as-mother"],
  "parallel_node_ids_proposed": ["sophia", "shakti", "nuit"]
}
```

When the user shares a map containing user-proposed nodes, the recipient sees them clearly marked as user-contributed.

---

## Forking

A user can **fork** another user's published map. Forking is the act of taking someone else's overlay and making it the starting point for one's own.

When User B forks User A's map:

1. A copy of User A's overlay is created and attached to User B's account.
2. The copy retains attribution: "Forked from User A's *Light-Bringers Working Map*, May 2026."
3. User B can then add, remove, or modify connections and notes freely. None of their changes affect User A's original.
4. Forks can be forked. The lineage is preserved as a chain.

Forking is the mechanism by which interpretive lineages form within the app. A teacher publishes their map; students fork it; students publish their own versions; over time, a tree of related interpretive maps grows.

### Fork attribution

Each overlay tracks its lineage:

```json
{
  "overlay_id": "overlay_xyz",
  "user_id": "user_xyz",
  "title": "My working map, after reading Pagels",
  "forked_from": "overlay_abc",
  "forked_from_user": "user_abc",
  "forked_from_title": "Pagels-inspired Gnostic emphasis",
  "fork_depth": 2,
  "created_at": "2026-05-15T20:00:00Z"
}
```

---

## Sharing

Three sharing modes:

### 1. Private (default)

The overlay is visible only to the user. No one else can view, fork, or comment.

### 2. Unlisted link

The user generates a shareable URL. Anyone with the link can view the overlay but not modify it. The link can be revoked.

Use case: sharing one's working map with a specific friend or teacher.

### 3. Published

The user publishes the overlay to a public directory. Other users can browse, view, and fork. The publisher can choose whether to allow comments on published maps.

When published, the overlay receives:

- A public URL
- A title and description chosen by the user
- A creator handle (anonymized if the user prefers)
- A tag set (e.g., "Gnostic-emphasis," "Feminine-divine focus," "Hindu-Christian parallels")
- A fork count and a view count

### Published map metadata schema

```json
{
  "overlay_id": "overlay_xyz",
  "title": "The Wisdom-Mother Across Traditions",
  "description": "An overlay foregrounding Sophia, Shekhinah, Shakti, Isis, Ma'at, and Prajnaparamita as one continuous figure.",
  "creator_handle": "soul_cartographer",
  "tags": ["feminine-divine", "Sophia", "cross-tradition"],
  "published_at": "2026-05-15T21:00:00Z",
  "view_count": 0,
  "fork_count": 0,
  "license": "CC-BY-SA-4.0",
  "visibility": "published"
}
```

---

## Map export and import

Every overlay can be exported as a single JSON file containing all connections, notes, tags, hidden nodes, and user-proposed nodes. The file is portable: a user can back it up, edit it in a text editor, transfer between accounts, or import another user's exported map directly.

### Export schema (top level)

```json
{
  "schema_version": "1.0",
  "exported_at": "2026-05-15T22:00:00Z",
  "overlay": {
    "id": "overlay_xyz",
    "title": "My working map",
    "description": "...",
    "creator_handle": "user_xyz",
    "forked_from": null,
    "fork_depth": 0
  },
  "connections": [],
  "annotations": [],
  "tag_sets": [],
  "hidden_node_ids": [],
  "user_proposed_nodes": []
}
```

Each array above contains objects in the corresponding schemas defined earlier in this document: `connections` uses the user-drawn connection schema, `annotations` uses the user-note schema, `tag_sets` uses the user-tag-set schema, and `user_proposed_nodes` uses the user-proposed-node schema.

This is also the format used for forking under the hood — a fork is just an internal import-with-attribution.

---

## Comments on published maps

Optional feature, opt-in per publisher. Comments attach to:

- The whole map (general feedback)
- A specific user-drawn connection (debate the parallel)
- A specific node annotation (respond to the note)

Comments inherit the same proponent-voice-by-default editorial direction. Scholarly caveats apply equally to comments — a commenter pushing back on a parallel can cite scholarly mode if they want academic backing.

---

## Moderation and curation

User-proposed nodes that the project curators accept get promoted into the canonical map. The contributor is credited (with their consent) in the node's metadata as a contributor.

Published maps that violate the project's editorial principles (gratuitous attack on living traditions, hate-speech disguised as commentary, etc.) are subject to moderation. The default stance is permissive — comparative esotericism inherently includes contested claims — but published maps are subject to community guidelines.

---

## Why the personal layer matters

The framework's core promise (per `docs/01`'s framing text) is that the user can build their own map of the divine. Without the personal layer, the Source Map is a finished encyclopedia. With it, the Source Map becomes a tool for the user's own work — a working surface on which their interpretation can be drawn, refined, shared, contested, and forked.

The personal layer is what turns a structural atlas into a personal practice.
