//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  ActionIcon,
  Container,
  List,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "tabler-icons-react";
import { CollectionEntryItem } from "types";
import { RecipeContext } from "utils/context/RecipeContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CollectionTreeProps {
  root: CollectionEntryItem;
  includeRecipes?: boolean;
  isTopLevel?: boolean;
  styles?: React.CSSProperties;
  onCollectionItemClick?: (collectionItem: CollectionEntryItem) => void;
}

type BooleanMap = { [key: string]: boolean };

// const scaleY = {
//   in: { opacity: 1, transform: "scaleY(1)" },
//   out: { opacity: 0, transform: "scaleY(0)" },
//   common: { transformOrigin: "top" },
//   transitionProperty: "transform, opacity",
// };

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionTree = ({
  root,
  isTopLevel,
  styles,
  onCollectionItemClick,
}: CollectionTreeProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------
  const { collections } = useContext(RecipeContext);
  const theme = useMantineTheme();

  const [sectionVisibilities, setSectionVisibilities] = useState<BooleanMap>(
    {}
  );

  useEffect(() => {
    const sections: BooleanMap = {};
    root.subCollections.forEach((subCollection) => {
      if (sections[subCollection] === undefined)
        sections[subCollection] = false;
    });

    setSectionVisibilities(sections);
  }, [root.subCollections]);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const changeSectionVisibility = (section: string) => {
    const curr = sectionVisibilities[section];

    setSectionVisibilities({
      ...sectionVisibilities,
      [section]: !curr,
    });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <List style={{ ...styles }}>
      {isTopLevel && <List.Item>{root.name}</List.Item>}
      {root.subCollections.map((subCollection) => {
        const collection = collections.get(subCollection)!;

        return (
          <List.Item
            icon={(
              <ActionIcon
                onClick={() => changeSectionVisibility(subCollection)}
              >
                {sectionVisibilities[subCollection] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </ActionIcon>
            )}
            key={subCollection}
          >
            <Container
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              }}
              onClick={
                onCollectionItemClick
                  ? () => onCollectionItemClick(collection)
                  : undefined
              }
            >
              {collection.name}
            </Container>

            <Transition
              mounted={
                sectionVisibilities[subCollection] === undefined
                  ? false
                  : sectionVisibilities[subCollection]
              }
              transition="scale-y"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <CollectionTree
                  root={collections.get(subCollection)!}
                  styles={{ ...styles }}
                  onCollectionItemClick={onCollectionItemClick}
                />
              )}
            </Transition>

            {/* {sectionVisibilities[subCollection] && (
              <CollectionTree root={collections.get(subCollection)!} />
            )} */}
          </List.Item>
        );
      })}
    </List>
  );
};

export default CollectionTree;
