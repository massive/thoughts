# Library Inventory

Last scanned: 2025-12-16

## Sources

### Calibre Library (Local iCloud)
Path: `/Users/matias.kakela/Library/Mobile Documents/com~apple~CloudDocs/Calibre Library`

### Google Drive (via rclone)
Path: `gdrive:onyx/books`

---

## Calibre Library - Authors

A. G. Riddle, A. J. Finn, A. M. Ollikainen, Agatha Christie, Alastair Reynolds, Alex Michaelides, Alistair MacLean, Amit Rathore, Andrzej Sapkowski, Andy Weir, Anna Keski-Rahkonen, Anthony Horowitz, Anthony Ryan, Anton Monti, Antonio Garcia Martinez, Arkady Martine, Arnold Schwarzenegger, Arttu Tuominen, Barack Obama, Ben Avery, Bill Bryson, Bill Clinton, Brandon Sanderson, Brendan Burns, Brent Weeks, Brian McClellan, Brian Staveley, Celeste Ng, Charles Dickens, Charles Portis, Cheryl Strayed, Cixin Liu, Clare Mackintosh, Colin Dexter, Colson Whitehead, Cormac McCarthy, Cornelia Davis, Dan Lyons, Dan Simmons, Daniel Abraham, Delia Owens, Django Wexler, Don Winslow, Elena Ferrante, Elina Backman, Elizabeth Strout, Frank Herbert, Fredrik Backman, Freida McFadden, Gene Kim, George Pelecanos, Gillian Flynn, Hanya Yanagihara, Harlan Coben, Haruki Murakami, Hugh Howey, Ian Rankin, Ilkka Remes, Indrek Hargla, J. K. Rowling, Jacqui Read, Jakub Korab, James Clavell, James Gough, James S. A. Corey, Jarkko Sipila, Jeanine Cummins, Jessica Bruder, Jessica Fellowes, Jim Butcher, Joe Abercrombie, Joel Dicker, John Grisham, John K. Ousterhout, John le Carre, John Scalzi, Jon Krakauer, Jonathan French, Jonathan Renshaw, Kaija Puura, Kale Puonti, Keigo Higashino, Ken Follett, Kim Zetter, Kjell Westo, Kristin Hannah, Larry McMurtry, Lee Child, Leigh Bardugo, Lev Grossman, LJ Ross, Louise Penny, Lucy Foley, Mario Puzo, Mark Lawrence, Mark Richards, Mark T. Sullivan, Mark Twain, Markku Henriksson, Marko Kilpi, Martha Wells, Martin Kleppmann, Martin Odersky, Martta Kaukonen, Matthew Mather, Max Seeck, Meri Valkama, Michael Connelly, Michael G. Manning, Michael J. Sullivan, Michael Margolis, Michelle Obama, Mikko Kamula, N. K. Jemisin, Neal Ford, Neil Gaiman, Niko Rantsi, Nilesh Patil, Noah Hawley, Patrick Rothfuss, Paul Scherz, Paula Hawkins, Pierce Brown, R. Scott Bakker, Ragnar Jonasson, Rebecca Kuang, Richard Rumelt, Robert Dugoni, Robert Galbraith, Robert Jackson Bennett, Robert Jordan, Robert Ludlum, Robin Hobb, Ryan Kirk, Sari Rainio, Scott Lynch, Scott Turow, Selwyn Raab, Stephen King, Steven Erikson, Stuart Turton, Tana French, Tanya Reilly, Tiina Huttu, Tom Clancy, Tove Jansson, Tuomas Niskakangas, Tyler Akidau, V. E. Schwab, Vaino Linna, Victor Methos, Vince Flynn, Walter Isaacson

---

## Google Drive (onyx/books) - Books

- Dan Brown: Angels and Demons, The Da Vinci Code, The Lost Symbol, Inferno, Origin
- Martha Wells: All Systems Red, Exit Strategy, Rogue Protocol (Murderbot Diaries)
- James Islington: The Shadow of What Was Lost, An Echo of Things to Come, The Light of All That Falls, The Strength of the Few (Licanius Trilogy + sequel)
- Michael Connelly: Nightshade, The Proving Ground
- Robert Galbraith: The Hallmarked Man
- Tom Clancy: Rainbow Six
- John Scalzi: Old Man's War
- Alfred Lansing: Endurance (Shackleton's Incredible Voyage)
- Jon Krakauer: Into Thin Air
- Peter James: Dead Simple

---

## Rescan Commands

To update this inventory:

```bash
# Calibre authors
ls -1 "/Users/matias.kakela/Library/Mobile Documents/com~apple~CloudDocs/Calibre Library" | grep -v "^\." | grep -v "metadata" | sort

# Google Drive books
rclone lsf "gdrive:onyx/books" --files-only
```
