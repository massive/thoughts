# AI-enabled contribution model

## The problem

AI makes it possible to contribute to repositories you don't know. A developer can now add features or fix bugs in services they've never touched before. This creates two problems.

First, we block contributions with complexity arguments. When someone asks to contribute to the data product designer, the response is "it's too complicated, not ready for contribution." This pattern repeats across repositories. We tell people to wait months instead of enabling them to fix what they care about.

Second, we have no guidelines for AI-assisted contributions. Someone can submit 5,000 lines of AI-generated code that becomes impossible to review. We need contribution standards before this becomes common practice.

## The opportunity

AI makes self-service contribution more viable than ever before. A developer with domain knowledge but limited codebase familiarity can now make meaningful contributions. The constraint was always learning the codebase, not understanding the problem. AI removes that constraint.

We already see this working in CMT. We should extend this model deliberately rather than blocking it with complexity arguments.

## The proposal

### Enable self-service contributions

Establish a guiding principle: developers should be able to fix or enhance services they care about, not wait for months. This means:

- Repositories declare whether they accept external contributions
- "Too complicated" is not a valid reason to block contributions
- Complexity is addressed through contribution guidelines, not rejection

### Define AI contribution standards

Introduce contribution requirements that apply to repositories with a self-service model. These requirements should address:

- Size limits for AI-generated changes (no 5,000-line commits)
- Documentation requirements for AI-assisted code
- Testing requirements before submission
- Code review expectations

Many open-source repositories have implemented similar requirements. We can learn from their patterns.

## Questions for the board

1. Do we agree that AI enables broader contribution models?
2. Should repositories be required to either accept contributions or explicitly document why not?
3. What should AI contribution guidelines include?
4. Should these guidelines apply universally or only to self-service repositories?

## References

Examples from open-source repositories available on request.
